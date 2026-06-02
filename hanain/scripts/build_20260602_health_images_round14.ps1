Add-Type -AssemblyName System.Drawing

function S([string]$base64) {
  return [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String($base64))
}

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'oral-minoxidil-hair-loss-blood-pressure-safety-record-2026.png'
    Output = 'rosemary-oil-hair-loss-scalp-irritation-record-2026.png'
    Title = S '66Gc7KaI66eI66as7Jik7J28IO2ZleyduA=='
    Subtitle = S '7YOI66qoIMK3IOuRkO2UvOyekOq3uSDCtyDsgqzsp4Qg6riw66Gd'
    Chips = @((S '7YOI66qo'), (S '65GQ7ZS8'), (S '6riw66Gd'))
  },
  @{
    Source = 'endometriosis-clinical-diagnosis-acog-record-2026.png'
    Output = 'pcos-glp1-insulin-resistance-pregnancy-planning-record-2026.png'
    Title = S 'UENPUyDsg4Hri7Qg6riw66Gd'
    Subtitle = S 'R0xQLTEgwrcg7J247IqQ66aw7KCA7ZWt7ISxIMK3IOyehOyLoOqzhO2ajQ=='
    Chips = @((S 'UENPUw=='), (S 'R0xQLTE='), (S '6riw66Gd'))
  },
  @{
    Source = 'testosterone-therapy-low-libido-blood-pressure-monitoring-2026.png'
    Output = 'phthalates-male-fertility-semen-quality-exposure-record-2026.png'
    Title = S '64Ko7ISxIOuCnOyehCDtmZXsnbg='
    Subtitle = S '7ZSE7YOI66CI7J207Yq4IMK3IOygleyVoeqygOyCrCDCtyDrhbjstpwg6riw66Gd'
    Chips = @((S '7KCV7J6Q'), (S '64W47Lac'), (S '7IOB64u0'))
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
