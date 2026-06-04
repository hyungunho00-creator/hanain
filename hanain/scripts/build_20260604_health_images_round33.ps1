Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$outDir = Join-Path $root 'public/og/content-quality'

$items = @(
  @{
    Source = 'biotin-hair-supplement-lab-test-interference-record-2026.png'
    Output = 'scalp-psoriasis-dandruff-silver-scale-hair-loss-record-2026.png'
    Kicker = 'SCALP SCALE RECORD'
    Title = @('비듬과 두피건선', '각질 기록')
    Subtitle = '은백색 각질·출혈·가려움 확인'
    Chips = @('두피건선', '비듬', '가려움')
    Accent = [System.Drawing.Color]::FromArgb(18, 96, 78)
  },
  @{
    Source = 'heat-exposure-male-fertility-sperm-record-2026.png'
    Output = 'bph-night-urination-weak-stream-urinary-symptom-record-2026.png'
    Kicker = 'URINARY SYMPTOM RECORD'
    Title = @('야간뇨와', '약한 소변줄')
    Subtitle = '전립선보다 증상 흐름 확인'
    Chips = @('남성건강', '전립선', '배뇨')
    Accent = [System.Drawing.Color]::FromArgb(52, 84, 126)
  },
  @{
    Source = 'perimenopause-abnormal-bleeding-menopause-record-2026.png'
    Output = 'migraine-aura-estrogen-birth-control-stroke-risk-record-2026.png'
    Kicker = 'AURA CONTRACEPTION RECORD'
    Title = @('편두통 조짐', '피임 상담 기록')
    Subtitle = '혈압·흡연·에스트로겐 확인'
    Chips = @('여성건강', '편두통', '피임')
    Accent = [System.Drawing.Color]::FromArgb(139, 82, 96)
  }
)

function New-Brush([System.Drawing.Color]$color) {
  return New-Object System.Drawing.SolidBrush($color)
}

function New-ArgbBrush([int]$a, [int]$r, [int]$g, [int]$b) {
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

function Draw-Chip($graphics, [float]$x, [float]$y, [string]$text, $font, [System.Drawing.Color]$accent) {
  $size = $graphics.MeasureString($text, $font)
  $w = [Math]::Ceiling($size.Width) + 38
  $h = 46
  Draw-RoundedRect $graphics (New-ArgbBrush 232 255 255 255) $x $y $w $h 22
  $pen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, $accent.R, $accent.G, $accent.B), 2)
  $graphics.DrawArc($pen, $x, $y, 44, 44, 90, 180)
  $pen.Dispose()
  $graphics.DrawString($text, $font, (New-ArgbBrush 255 16 45 39), ($x + 17), ($y + 9))
  return $x + $w + 12
}

$fontFamily = 'Malgun Gothic'
$kickerFont = New-Object System.Drawing.Font($fontFamily, 20, [System.Drawing.FontStyle]::Bold)
$titleFont = New-Object System.Drawing.Font($fontFamily, 48, [System.Drawing.FontStyle]::Bold)
$subtitleFont = New-Object System.Drawing.Font($fontFamily, 25, [System.Drawing.FontStyle]::Regular)
$chipFont = New-Object System.Drawing.Font($fontFamily, 21, [System.Drawing.FontStyle]::Bold)
$smallFont = New-Object System.Drawing.Font($fontFamily, 18, [System.Drawing.FontStyle]::Regular)
$badgeFont = New-Object System.Drawing.Font($fontFamily, 24, [System.Drawing.FontStyle]::Bold)

foreach ($item in $items) {
  $sourcePath = Join-Path $outDir $item.Source
  $outputPath = Join-Path $outDir $item.Output
  $src = [System.Drawing.Image]::FromFile($sourcePath)
  $bmp = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $g.DrawImage($src, 0, 0, 1200, 630)
  $g.FillRectangle((New-ArgbBrush 138 255 252 246), 0, 0, 1200, 630)
  $g.FillRectangle((New-ArgbBrush 214 255 255 255), 0, 0, 780, 630)
  $g.FillEllipse((New-ArgbBrush 42 $item.Accent.R $item.Accent.G $item.Accent.B), 820, -150, 520, 520)

  Draw-RoundedRect $g (New-ArgbBrush 242 255 255 255) 58 62 704 500 31
  $outline = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(232, 222, 228, 222), 2)
  $g.DrawRectangle($outline, 60, 64, 700, 496)
  $outline.Dispose()
  $g.FillRectangle((New-Brush $item.Accent), 92, 130, 150, 6)

  $g.DrawString($item.Kicker, $kickerFont, (New-Brush $item.Accent), 92, 88)
  $y = 168
  foreach ($line in $item.Title) {
    $g.DrawString($line, $titleFont, (New-ArgbBrush 255 12 35 30), 92, $y)
    $y += 61
  }
  $g.DrawString($item.Subtitle, $subtitleFont, (New-ArgbBrush 255 62 76 70), 94, ($y + 18))

  $chipX = 92
  foreach ($chip in $item.Chips) {
    $chipX = Draw-Chip $g $chipX 430 $chip $chipFont $item.Accent
  }

  $g.DrawString('공식 자료 기반 · 기록 중심 건강정보', $smallFont, (New-ArgbBrush 255 86 103 97), 94, 516)

  Draw-RoundedRect $g (New-ArgbBrush 184 255 255 255) 884 420 234 86 25
  $g.DrawString('기록', $badgeFont, (New-Brush $item.Accent), 913, 445)
  $divider = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(203, 216, 210), 2)
  $g.DrawLine($divider, 989, 442, 989, 480)
  $divider.Dispose()
  $g.DrawString('상담', $badgeFont, (New-Brush $item.Accent), 1022, 445)

  $bmp.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
  $src.Dispose()
  Write-Host "created $outputPath"
}

