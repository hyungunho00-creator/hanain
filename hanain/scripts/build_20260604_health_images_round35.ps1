Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent (Split-Path -Parent $MyInvocation.MyCommand.Path)
$dir = Join-Path $root "public\og\content-quality"

$items = @(
  @{ Source="glp1-muscle-loss-protein-resistance-training-2026.png"; Output="glp1-plateau-muscle-gut-phlorotannin-record-2026.png"; Kicker="METABOLISM"; Title=@("GLP-1 Plateau","Muscle + Gut Record"); Subtitle="Protein, hydration, rhythm"; Accent=[System.Drawing.Color]::FromArgb(7,91,69) },
  @{ Source="personalized-cancer-vaccine-ctdna-neoantigen-trial-record-2026.png"; Output="cancer-biomarker-ctdna-mrd-report-phlorotannin-2026.png"; Kicker="CANCER IMMUNE"; Title=@("ctDNA + MRD","Report Questions"); Subtitle="Biomarkers need context"; Accent=[System.Drawing.Color]::FromArgb(123,65,92) },
  @{ Source="young-colorectal-cancer-blood-stool-screening-symptoms-2026.png"; Output="young-colorectal-cancer-stool-blood-gut-record-2026.png"; Kicker="DIGESTIVE"; Title=@("Young Colorectal","Signal Checklist"); Subtitle="Stool change, blood, timing"; Accent=[System.Drawing.Color]::FromArgb(29,118,92) },
  @{ Source="lpa-once-lifetime-test-family-heart-risk-record-2026.png"; Output="lpa-apob-family-heart-risk-phlorotannin-2026.png"; Kicker="HEART"; Title=@("Lp(a) + ApoB","Family Risk Record"); Subtitle="Look beyond total cholesterol"; Accent=[System.Drawing.Color]::FromArgb(142,68,62) },
  @{ Source="tia-mini-stroke-fast-warning-symptom-time-record-2026.png"; Output="tia-brain-fog-stroke-time-record-phlorotannin-2026.png"; Kicker="BRAIN"; Title=@("TIA Warning","Time Record"); Subtitle="Face, arm, speech, time"; Accent=[System.Drawing.Color]::FromArgb(60,84,146) },
  @{ Source="teen-social-media-sleep-mental-health-boundary-record-2026.png"; Output="social-media-sleep-anxiety-digital-boundary-phlorotannin-2026.png"; Kicker="MENTAL HEALTH"; Title=@("Sleep + Anxiety","Digital Boundary"); Subtitle="Night scroll, alert, recovery"; Accent=[System.Drawing.Color]::FromArgb(87,76,135) },
  @{ Source="older-adult-fall-prevention-balance-medication-vision-record-2026.png"; Output="osteoporosis-fall-prevention-muscle-protein-phlorotannin-2026.png"; Kicker="MUSCLE BONE"; Title=@("Bone + Balance","Fall Prevention"); Subtitle="Protein, strength, home safety"; Accent=[System.Drawing.Color]::FromArgb(125,92,47) },
  @{ Source="bemotrizinol-sunscreen-uva-broad-spectrum-record-2026.png"; Output="uva-sunscreen-bemotrizinol-skin-barrier-phlorotannin-2026.png"; Kicker="SKIN"; Title=@("UVA Protection","Barrier Routine"); Subtitle="Sunscreen, cleansing, moisture"; Accent=[System.Drawing.Color]::FromArgb(149,72,105) },
  @{ Source="alopecia-areata-jak-inhibitor-boxed-warning-safety-record-2026.png"; Output="alopecia-areata-jak-safety-scalp-record-phlorotannin-2026.png"; Kicker="SCALP"; Title=@("Alopecia Areata","Safety Record"); Subtitle="Pattern, timing, inflammation"; Accent=[System.Drawing.Color]::FromArgb(72,101,63) },
  @{ Source="wildfire-smoke-aqi-n95-asthma-copd-action-record-2026.png"; Output="wildfire-smoke-asthma-indoor-air-phlorotannin-2026.png"; Kicker="RESPIRATORY"; Title=@("Wildfire Smoke","Indoor Air Plan"); Subtitle="AQI, filter, symptoms"; Accent=[System.Drawing.Color]::FromArgb(55,96,122) },
  @{ Source="measles-mmr-vitamin-a-outbreak-check-2026.png"; Output="measles-mmr-vitamin-a-misinformation-immune-phlorotannin-2026.png"; Kicker="IMMUNE"; Title=@("Measles + MMR","Fact Boundary"); Subtitle="Exposure, rash, isolation"; Accent=[System.Drawing.Color]::FromArgb(168,65,60) },
  @{ Source="menopause-hormone-therapy-label-change-risk-conversation-2026.png"; Output="menopause-sleep-hormone-label-hot-flash-phlorotannin-2026.png"; Kicker="WOMEN"; Title=@("Menopause Sleep","Symptom Record"); Subtitle="Hot flash, rhythm, questions"; Accent=[System.Drawing.Color]::FromArgb(150,82,107) },
  @{ Source="testosterone-therapy-fertility-sperm-count-record-2026.png"; Output="testosterone-therapy-fertility-psa-heart-record-phlorotannin-2026.png"; Kicker="MEN"; Title=@("Testosterone","PSA + Fertility Record"); Subtitle="Hormone, heart, family plan"; Accent=[System.Drawing.Color]::FromArgb(80,93,126) }
)

function New-Brush([System.Drawing.Color]$color) {
  return New-Object System.Drawing.SolidBrush($color)
}

function Add-RoundedRect($graphics, [System.Drawing.Brush]$brush, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, $r, $r, 180, 90)
  $path.AddArc($x + $w - $r, $y, $r, $r, 270, 90)
  $path.AddArc($x + $w - $r, $y + $h - $r, $r, $r, 0, 90)
  $path.AddArc($x, $y + $h - $r, $r, $r, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $path.Dispose()
}

$quality = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 92L)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/png" } | Select-Object -First 1
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = $quality

foreach ($item in $items) {
  $sourcePath = Join-Path $dir $item.Source
  if (-not (Test-Path $sourcePath)) {
    Write-Host "Missing source: $($item.Source)"
    continue
  }

  $source = [System.Drawing.Image]::FromFile($sourcePath)
  $canvas = New-Object System.Drawing.Bitmap(1200, 630)
  $g = [System.Drawing.Graphics]::FromImage($canvas)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

  $g.Clear([System.Drawing.Color]::FromArgb(255,253,247))
  $g.DrawImage($source, 0, 0, 1200, 630)

  $shade = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
    (New-Object System.Drawing.Rectangle(0,0,1200,630)),
    [System.Drawing.Color]::FromArgb(238,255,253,247),
    [System.Drawing.Color]::FromArgb(92,255,253,247),
    0
  )
  $g.FillRectangle($shade, 0, 0, 1200, 630)

  Add-RoundedRect $g (New-Brush ([System.Drawing.Color]::FromArgb(245,255,255,255))) 62 58 650 488 34
  $pen = New-Object System.Drawing.Pen($item.Accent, 4)
  $g.DrawRectangle($pen, 70, 66, 634, 472)

  $kickerFont = New-Object System.Drawing.Font("Arial", 26, [System.Drawing.FontStyle]::Bold)
  $titleFont = New-Object System.Drawing.Font("Arial", 56, [System.Drawing.FontStyle]::Bold)
  $subtitleFont = New-Object System.Drawing.Font("Arial", 28, [System.Drawing.FontStyle]::Regular)
  $brandFont = New-Object System.Drawing.Font("Arial", 24, [System.Drawing.FontStyle]::Bold)
  $chipFont = New-Object System.Drawing.Font("Arial", 21, [System.Drawing.FontStyle]::Bold)

  $gold = [System.Drawing.Color]::FromArgb(198,154,45)
  $dark = [System.Drawing.Color]::FromArgb(8,45,31)
  $muted = [System.Drawing.Color]::FromArgb(76,58,42)

  $g.DrawString($item.Kicker, $kickerFont, (New-Brush $gold), 104, 100)
  $g.DrawLine((New-Object System.Drawing.Pen($gold, 4)), 104, 145, 310, 145)

  $y = 176
  foreach ($line in $item.Title) {
    $g.DrawString($line, $titleFont, (New-Brush $dark), 100, $y)
    $y += 68
  }

  $g.DrawString($item.Subtitle, $subtitleFont, (New-Brush $muted), 104, ($y + 12))

  Add-RoundedRect $g (New-Brush $item.Accent) 104 430 500 74 28
  $g.DrawString("PHLOROTANNIN HEALTH BRIEF", $brandFont, (New-Brush ([System.Drawing.Color]::White)), 130, 451)

  Add-RoundedRect $g (New-Brush ([System.Drawing.Color]::FromArgb(246,241,231))) 780 410 318 112 24
  $g.DrawString("Evidence", $chipFont, (New-Brush $dark), 814, 432)
  $g.DrawString("Record first", $chipFont, (New-Brush $dark), 814, 470)

  $leafPen = New-Object System.Drawing.Pen($gold, 5)
  $g.DrawEllipse($leafPen, 1038, 92, 74, 42)
  $g.DrawLine($leafPen, 1072, 112, 1030, 74)
  $g.DrawLine($leafPen, 1072, 112, 1112, 86)

  $out = Join-Path $dir $item.Output
  $canvas.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)

  $leafPen.Dispose()
  $pen.Dispose()
  $shade.Dispose()
  $g.Dispose()
  $canvas.Dispose()
  $source.Dispose()
  Write-Host "Created $($item.Output)"
}
