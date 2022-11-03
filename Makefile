all: preview

preview:
	python3 -m http.server --directory public & browse http://127.0.0.1:8000

bro:
	browse nhee.ru
