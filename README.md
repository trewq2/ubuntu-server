# Ubuntu Server 26.04.1 LTS szerverlabor – GitHub Pages

## Tartalom
8 × 45 perces részletes szerverlabor:
1. Ubuntu Server / APT / VirtualBox hálózat
2. Netplan statikus belső IP / SSH / PuTTY
3. felhasználók / csoportok / jogosultságok
4. Kea DHCP4
5. BIND9 DNS
6. vsftpd
7. Apache2
8. nftables + integrált hibakeresés

## Tanulói bizonyíték
K01–K30 képernyőkép, kész Word sablonnal.

## Hálózat
Ubuntu Server:
- NIC1 NAT
- NIC2 Internal Network / UBUNTULAB
- 192.168.60.1/24

Windows 7:
- Internal Network / UBUNTULAB
- DHCP pool: 192.168.60.100–150

## GitHub Pages
A repository gyökerébe:
- index.html
- styles.css
- script.js
- config.js
- downloads/
- README.md

Settings → Pages → Deploy from a branch → main → /(root)

## OVA linkek
A `config.js` fájlban állíthatók be.
Részletesen: `OVA_LINKS_BEALLITASA.md`

## Ubuntu-specifikus eltérés a Debian laborhoz képest
A fő tanulási célok azonosak, de a tartós hálózatbeállítás Ubuntu Serveren Netplan YAML-fájlokkal történik az `/etc/netplan` könyvtárban.

## OVA készítés
Az `ova_builder` mappa tartalmazza az Ubuntu Server 26.04.1 LTS RAW OVA tanári elkészítésének reprodukálható scriptjeit és leírását.
