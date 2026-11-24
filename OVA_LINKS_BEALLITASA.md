# OVA letöltési linkek beállítása

A weboldal két nagy OVA fájlt nem tartalmazza közvetlenül. A linkeket a `config.js` fájlban kell megadni.

## Ubuntu Server OVA
Keresd:

```javascript
ubuntuOva: {
  url: "PASTE_UBUNTU_OVA_DOWNLOAD_URL_HERE",
```

és cseréld például Google Drive megosztási linkre.

## Windows 7 OVA
A `windowsOva` blokkban add meg a Windows 7 kliens OVA megosztási linkjét.

## Google Drive jogosultság
Megosztás → Általános hozzáférés → Bárki, aki rendelkezik a linkkel → Megtekintő.

## SHA256
Windows:

```cmd
certutil -hashfile Ubuntu26_04_1_RAW.ova SHA256
```

Az eredményt a `sha256:` mezőbe lehet írni.
