all: preview

preview:
	python3 -m http.server & browse http://127.0.0.1:8000

