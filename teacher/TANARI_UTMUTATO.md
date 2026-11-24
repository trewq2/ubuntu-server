# Tanári útmutató – Ubuntu Server 26.04.1 LTS szerverlabor

## Javasolt óraszám
8 × 45 perc + opcionális 45 perces záró hibakeresési kihívás.

## Topológia
Ubuntu Server:
- Adapter 1: NAT
- Adapter 2: Internal Network / UBUNTULAB
- belső cím: 192.168.60.1/24

Windows 7 x86 kliens:
- Adapter 1: Internal Network / UBUNTULAB
- kezdetben: 192.168.60.10/24 statikus
- a DHCP-modultól kezdve: automatikus címzés

## Modulok
1. Ubuntu Server felmérése, APT, VirtualBox-hálózat
2. Netplan, SSH és PuTTY
3. Felhasználók, csoportok, fájl- és könyvtárjogosultságok
4. Kea DHCP4
5. BIND9 DNS
6. vsftpd és jogosultságteszt
7. Apache2
8. nftables és integrált hibakeresés

## Felhasználók
- anna
- bela
- vendeg
- csoport: projekt

## Könyvtárak
- /srv/ftp/anna      → csak anna
- /srv/ftp/bela      → csak bela
- /srv/ftp/kozos     → projekt csoport, setgid
- /srv/ftp/nyilvanos → mindenki számára olvasható

## Értékelés – 100 pont
- OVA/topológia/rendszerfelmérés: 8
- hálózat + SSH/PuTTY: 14
- felhasználók/jogosultságok: 16
- Kea DHCP: 14
- BIND9 DNS: 14
- FTP: 14
- Apache2: 10
- nftables + integrált teszt: 6
- dokumentáció: 4

## Képernyőképes dokumentáció
A tanulói weboldal K01–K30 jelöléssel adja meg a bizonyítékokat. A kész Word-sablonban minden kódhoz külön képhely és magyarázatmező tartozik.

Javasolt beadás:
Vezeteknev_Keresztnev_Ubuntu_Labor.pdf

## Oktatási megfontolás
Az FTP kizárólag az izolált belső hálózaton szerepel, a Linux jogosultságok gyakorlati megtapasztalására. Éles rendszerben SFTP/SSH alapú fájlátvitel ajánlott.

## Ubuntu-specifikus eltérések a Debian laborhoz képest
- Netplan YAML az `/etc/network/interfaces(.d)` helyett;
- a tartós konfigurációhoz `netplan generate/try/apply`;
- BIND9 szolgáltatásnévként a `bind9` egységet használjuk;
- az UFW állapotát ellenőrizzük, de a laborban közvetlenül nftables szabályokat gyakorlunk;
- az APT, Kea, BIND9, vsftpd és Apache2 tanulási célok változatlanok.
