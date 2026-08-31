param(
  [string]$Root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
)

$ErrorActionPreference = 'Stop'

$indexPath = Join-Path $Root 'index.html'
$routesPath = Join-Path $Root 'data/routes.js'
$sitemapPath = Join-Path $Root 'sitemap.xml'

$index = Get-Content -LiteralPath $indexPath -Raw
$routes = Get-Content -LiteralPath $routesPath -Raw
$sitemap = Get-Content -LiteralPath $sitemapPath -Raw

$pageIds = [regex]::Matches($index, 'id="page-([^"]+)') |
  ForEach-Object { $_.Groups[1].Value } |
  Sort-Object -Unique

$routeTuples = [regex]::Matches($routes, "\['([^']+)'\s*,\s*'(/[^']*)'") |
  Where-Object { $_.Groups[1].Value -notlike '/*' }

$routeIds = $routeTuples |
  ForEach-Object { $_.Groups[1].Value }
$routeIds += 1..19 | ForEach-Object { "article$_" }
$routeIds += 1..6 | ForEach-Object { "recipe$_" }
$routeIds += Get-ChildItem -LiteralPath $Root -Directory -Filter 'library-*' | ForEach-Object { $_.Name }
$routeIds = $routeIds | Sort-Object -Unique

$routePaths = $routeTuples |
  ForEach-Object { $_.Groups[2].Value }
$routePaths += 1..19 | ForEach-Object { "/article$_" }
$routePaths += 1..6 | ForEach-Object { "/recipe$_" }
$routePaths += Get-ChildItem -LiteralPath $Root -Directory -Filter 'library-*' | ForEach-Object { '/' + $_.Name }
$routePaths = $routePaths | Sort-Object

$sitemapPaths = [regex]::Matches($sitemap, '<loc>https://holisticvox\.com([^<]*)</loc>') |
  ForEach-Object { $_.Groups[1].Value } |
  Sort-Object -Unique

$imageRefs = [regex]::Matches($index, '<img[^>]+src="([^"]+)"') |
  ForEach-Object { $_.Groups[1].Value } |
  Where-Object { $_ -like 'images/*' } |
  Sort-Object -Unique

$missingImages = foreach ($ref in $imageRefs) {
  if (-not (Test-Path -LiteralPath (Join-Path $Root $ref))) { $ref }
}

$physicalRouteFolders = Get-ChildItem -LiteralPath $Root -Directory |
  Where-Object { Test-Path -LiteralPath (Join-Path $_.FullName 'index.html') } |
  ForEach-Object { $_.Name } |
  Sort-Object -Unique

$result = [ordered]@{
  pageCount = ($pageIds | Measure-Object).Count
  routeCount = ($routeIds | Measure-Object).Count
  sitemapCount = ($sitemapPaths | Measure-Object).Count
  routeWithoutPage = @($routeIds | Where-Object { $pageIds -notcontains $_ })
  pageWithoutRoute = @($pageIds | Where-Object { $routeIds -notcontains $_ })
  sitemapUrlWithoutRoute = @($sitemapPaths | Where-Object { $routePaths -notcontains $_ })
  duplicateCanonicalUrl = @($routePaths | Group-Object | Where-Object { $_.Count -gt 1 } | ForEach-Object { $_.Name })
  missingReferencedImage = @($missingImages)
  physicalRouteFolderWithoutPage = @($physicalRouteFolders | Where-Object { $pageIds -notcontains $_ -and $_ -notin @('market','shop','media','podcast') })
}

$result.GetEnumerator() | ForEach-Object {
  if ($_.Value -is [array]) {
    Write-Output "$($_.Key): $($_.Value.Count)"
    $_.Value | ForEach-Object { Write-Output "  - $_" }
  } else {
    Write-Output "$($_.Key): $($_.Value)"
  }
}

$hasFailures = $result.routeWithoutPage.Count -or
  $result.sitemapUrlWithoutRoute.Count -or
  $result.duplicateCanonicalUrl.Count -or
  $result.missingReferencedImage.Count

if ($hasFailures) { exit 1 }
