Add-Type -AssemblyName System.Drawing

function S([string]$base64) {
  return [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($base64))
}

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'wildfire-smoke-pm25-respiratory-antioxidant-record-2026.png'
    Output = 'wildfire-smoke-aqi-n95-asthma-copd-action-record-2026.png'
    Title = S '7IKw67aIIOyXsOq4sCBQTTIuNSDtmLjtnaHquLAg6riw66Gd'
    Subtitle = S 'QVFJwrdOOTXCt+yLpOuCtOqzteq4sCDsg4Hri7Q='
    Chips = @((S '7Jew6riw'), (S '7LKc7Iud'), (S '6riw66Gd'))
  },
  @{
    Source = 'tick-bite-lyme-alpha-gal-syndrome-summer-record-2026.png'
    Output = 'dengue-chikungunya-travel-fever-joint-pain-mosquito-record-2026.png'
    Title = S '646F6riwwrfsuZjsv6Tqtazri4jslbwg7Jes7ZaJIOq4sOuhnQ=='
    Subtitle = S '66qo6riwwrfrsJzsl7TCt+q0gOygiO2GtSDsg4Hri7Q='
    Chips = @((S '646F6riw'), (S '66qo6riw'), (S '7Jes7ZaJ'))
  },
  @{
    Source = 'melasma-tinted-sunscreen-visible-light-iron-oxide-record-2026.png'
    Output = 'tattoo-ink-contamination-skin-cancer-mole-monitoring-record-2026.png'
    Title = S '66y47IugIOyeie2BrCDtlLzrtoAg7JWI7KCEIOq4sOuhnQ=='
    Subtitle = S '7Jik7Je8wrfslYzroIjrpbTquLDCt+ygkCDrs4DtmZQg7IOB64u0'
    Chips = @((S '66y47Iug'), (S '7ZS867aA'), (S '6rSA7LCw'))
  }
)

function New-Brush([int]$a, [int]$r, [int]$g, [int]$b) {
  return New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($a, $r, $g, $b))
}

function Draw-RoundedRect($graphics, $brush, [float]$x, [float]$y, [float]$w, [float]$h, [float]$radius) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $d = $radius * 2
  $path.AddArc($x, $y, $d, $d, 180, 90)
  $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
  $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
  $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

$fontFamily = 'Malgun Gothic'
$brandFont = New-Object System.Drawing.Font($fontFamily, 20, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font($fontFamily, 38, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font($fontFamily, 25, [System.Drawing.FontStyle]::Regular)
$chipFont = New-Object System.Drawing.Font($fontFamily, 18, [System.Drawing.FontStyle]::Bold)
$captionFont = New-Object System.Drawing.Font($fontFamily, 16, [System.Drawing.FontStyle]::Regular)

foreach ($item in $items) {
  $sourcePath = Join-Path $outDir $item.Source
  $outputPath = Join-Path $outDir $item.Output
  $src = [System.Drawing.Image]::FromFile($sourcePath)
  $bmp = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
  $g.DrawImage($src, 0, 0, 1200, 630)

  Draw-RoundedRect $g (New-Brush 255 255 255 255) 70 66 850 502 28
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(92, 27, 87, 76), 2)
  $g.DrawLine($pen, 100, 148, 260, 148)
  $pen.Dispose()

  $g.DrawString('PHLOROTANNIN CATEGORY UPDATE', $brandFont, (New-Brush 255 35 103 82), 96, 102)
  $g.DrawString($item.Title, $titleFont, (New-Brush 255 9 35 30), 96, 194)
  $g.DrawString($item.Subtitle, $subtitleFont, (New-Brush 255 47 64 58), 100, 306)

  $x = 100
  foreach ($chip in $item.Chips) {
    $size = $g.MeasureString($chip, $chipFont)
    $w = [Math]::Ceiling($size.Width) + 38
    Draw-RoundedRect $g (New-Brush 250 255 255 255) $x 412 $w 48 24
    $chipPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(190, 35, 103, 82), 2)
    $g.DrawArc($chipPen, $x, 412, 48, 48, 90, 180)
    $chipPen.Dispose()
    $g.DrawString($chip, $chipFont, (New-Brush 255 20 88 67), ($x + 18), 423)
    $x += $w + 16
  }

  Draw-RoundedRect $g (New-Brush 247 255 255 255) 872 420 260 88 24
  $g.DrawString((S '6re86rGwICB8ICDquLDroZ0='), $subtitleFont, (New-Brush 255 38 113 87), 925, 448)
  $g.DrawString((S '7LWc7IugIOyekOujjCDquLDrsJggwrcg7Lm07YWM6rOg66asIOyInO2ZmCDrs7TqsJU='), $captionFont, (New-Brush 255 82 101 96), 100, 530)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}
