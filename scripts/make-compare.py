from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(r"C:\Users\10245\dsh-blue-whale")
OUT = ROOT / "docs"
OUT.mkdir(exist_ok=True)
ASSETS = Path(
    r"C:\Users\10245\.grok\sessions\C%3A%5CUsers%5C10245\01a0012d-14d4-7e23-8b4c-637017f72286\assets"
)

BEFORE = ASSETS / "image-d30dd515-27b2-434e-92e3-30be000dd71c.jpg"
AFTER = ASSETS / "image-8978f8d0-ee5f-4831-8eb4-0ca119e98eef.jpg"
FAVICON = ASSETS / "image-4f326285-9f96-4b97-9d18-31b068794e41.png"

ACCENT = (77, 107, 254)
INK = (23, 23, 26)
MUTED = (110, 114, 122)
LINE = (228, 230, 235)
PAPER = (255, 255, 255)
BAND = (247, 248, 250)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    name = "msyhbd.ttc" if bold else "msyh.ttc"
    return ImageFont.truetype(rf"C:\Windows\Fonts\{name}", size)


def rgb(im: Image.Image) -> Image.Image:
    return im.convert("RGB") if im.mode != "RGB" else im


def fit(im: Image.Image, width: int) -> Image.Image:
    im = rgb(im)
    ratio = width / im.width
    return im.resize((width, max(1, round(im.height * ratio))), Image.Resampling.LANCZOS)


def panel(im: Image.Image, title: str, width: int) -> Image.Image:
    shot = fit(im, width)
    pad = 16
    label_h = 52
    canvas = Image.new("RGB", (shot.width + pad * 2, shot.height + pad * 2 + label_h), PAPER)
    canvas.paste(shot, (pad, pad + label_h))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, canvas.width - 1, canvas.height - 1), radius=18, outline=LINE, width=1)
    draw.rectangle((1, 1, canvas.width - 2, label_h), fill=BAND)
    draw.ellipse((22, 18, 36, 32), fill=ACCENT if "后" in title else (40, 40, 44))
    draw.text((48, 14), title, font=font(20, True), fill=INK)
    return canvas


def stack(left: Image.Image, right: Image.Image, heading: str, sub: str, extra: Image.Image | None = None) -> Image.Image:
    gap = 24
    header = 108
    side = 36
    extra_h = extra.height + 20 if extra is not None else 0
    width = side * 2 + left.width + gap + right.width
    height = header + extra_h + max(left.height, right.height) + 36
    canvas = Image.new("RGB", (width, height), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.text((side, 28), heading, font=font(30, True), fill=INK)
    draw.text((side, 70), sub, font=font(16), fill=MUTED)
    y = header
    if extra is not None:
        canvas.paste(extra, (side, y))
        y += extra.height + 20
    canvas.paste(left, (side, y))
    canvas.paste(right, (side + left.width + gap, y))
    return canvas


def note_bar(width: int) -> Image.Image:
    icon = Image.open(FAVICON).convert("RGBA")
    icon = icon.resize((36, 36), Image.Resampling.LANCZOS)
    h = 56
    bar = Image.new("RGB", (width, h), BAND)
    draw = ImageDraw.Draw(bar)
    draw.rounded_rectangle((0, 0, width - 1, h - 1), radius=14, outline=LINE, width=1)
    bar.paste(icon, (16, 10), icon)
    draw.text((64, 14), "浏览器标签页图标也会换成蓝鲸", font=font(18, True), fill=INK)
    return bar


def stack_v(top: Image.Image, bottom: Image.Image, title: str) -> Image.Image:
    w = 820
    t = fit(top, w)
    b = fit(bottom, w)
    label_h = 48
    gap = 12
    canvas = Image.new("RGB", (w + 32, label_h + t.height + gap + b.height + 32), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle((0, 0, canvas.width - 1, canvas.height - 1), radius=18, outline=LINE, width=1)
    draw.rectangle((1, 1, canvas.width - 2, label_h), fill=BAND)
    draw.ellipse((20, 16, 34, 30), fill=ACCENT if "后" in title else (40, 40, 44))
    draw.text((44, 12), title, font=font(20, True), fill=INK)
    canvas.paste(t, (16, label_h + 10))
    canvas.paste(b, (16, label_h + 10 + t.height + gap))
    return canvas


before = rgb(Image.open(BEFORE))
after = rgb(Image.open(AFTER))

home = stack(
    panel(before, "使用前 · 出厂黑鲸", 860),
    panel(after, "使用后 · 复刻蓝鲸", 860),
    "dsh-blue-whale 首页对比",
    "侧栏字标、欢迎页鲸标换成 Chat 蓝 #4D6BFE；浏览器标签页图标也会换成蓝鲸",
    extra=note_bar(860 * 2 + 24),
)
home.save(OUT / "compare-home.png", optimize=True)

bw, bh = before.size
aw, ah = after.size
before_brand = before.crop((0, 0, 560, 130))
after_brand = after.crop((0, 0, 560, 130))
before_hero = before.crop((480, 390, 1520, 720))
after_hero = after.crop((480, 390, 1520, 720))

brand = stack(
    stack_v(before_brand, before_hero, "使用前 · 出厂黑鲸"),
    stack_v(after_brand, after_hero, "使用后 · 复刻蓝鲸"),
    "dsh-blue-whale 品牌对比",
    "侧栏 deepseek 字 + 欢迎页鲸换成 Chat 蓝；标签页图标同步变蓝",
    extra=note_bar(820 * 2 + 32 + 24),
)
brand.save(OUT / "compare-brand.png", optimize=True)
print(home.size, OUT / "compare-home.png")
print(brand.size, OUT / "compare-brand.png")
