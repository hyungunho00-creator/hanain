Add-Type -AssemblyName System.Drawing

function S([string]$base64) {
  return [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($base64))
}

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'rosemary-oil-hair-loss-scalp-irritation-record-2026.png'
    Output = 'finasteride-dutasteride-hair-loss-safety-warning-record-2026.png'
    Title = S '7YOI66qo7JW9IOyViOyghCDqsr3qs6A='
    Subtitle = S '7ZWAwrfrkZDtg4Ag67aA7J6R7JqpIOq4sOuhnQ=='
    Chips = @((S '7ZS864KY7Iqk7YWM66as65Oc'), (S '6riw67aEIOuzgO2ZlA=='), (S '7ISx6riw64ql'))
  },
  @{
    Source = 'pcos-glp1-insulin-resistance-pregnancy-planning-record-2026.png'
    Output = 'hpv-self-collection-cervical-screening-home-test-record-2026.png'
    Title = S 'SFBWIOyekOqwgOyxhOy3qA=='
    Subtitle = S '7J6Q6raB6rK967aA7JWUIOyEoOuzhOqygOyCrA=='
    Chips = @((S 'SFBW'), (S '7J6Q6rCA7LGE7Leo'), (S '7LaU7KCB6rKA7IKs'))
  },
  @{
    Source = 'testosterone-therapy-low-libido-blood-pressure-monitoring-2026.png'
    Output = 'erectile-dysfunction-cardiovascular-risk-blood-pressure-record-2026.png'
    Title = S '67Cc6riw67aA7KCEIOyLrO2YiOq0gCDsi6DtmLg='
    Subtitle = S '7ZiI7JWVwrftmIjri7nCt+yngOyniCDquLDroZ0='
    Chips = @((S '67Cc6riw67aA7KCE'), (S '7Ius7ZiI6rSA'), (S '7ZiI7JWV'))
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
$titleFont = New-Object System.Drawing.Font($fontFamily, 43, [System.Drawing.FontStyle]::Bold)
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

  Draw-RoundedRect $g (New-Brush 252 255 255 255) 70 66 770 502 28
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(84, 27, 87, 76), 2)
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

  Draw-RoundedRect $g (New-Brush 247 255 255 255) 842 420 290 88 24
  $g.DrawString((S '6re86rGwICB8ICDquLDroZ0='), $subtitleFont, (New-Brush 255 38 113 87), 918, 448)
  $g.DrawString((S '7LWc7IugIOyekOujjCDquLDrsJggwrcg7Lm07YWM6rOg66asIOyInO2ZmCDrs7TqsJU='), $captionFont, (New-Brush 255 82 101 96), 100, 530)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}
