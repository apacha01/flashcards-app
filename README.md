# Flashcards App

A web app that uses a json to show the front and back of a flashcard for studying purposes. This is a very simple app, i'm doing it super fast just for the [practice-cs](https://github.com/apacha01/practice-cs) repository.

## The Format

Flashcards will have the following types: normal text, code and image. If you want to create your own just follow the json structure like this:
```json
{
	"front": "The front of the card: string",
	"back": "Back of the card: string (if it's an image you either put the link to it or load the file and it'll be encoded base 64)",
	"type": "Type can only be: text | code:language | image.",
}
```

* If type is `text`, it will simply show the information.
* If type is `code`, it will use prism to show the code. The app will look for the `:` (colon) separation and select the language, if not specified it will default to C. **However other languages beside C are not** yet supported, since i couldn't make the prism auto loader work and i wanted to finish this fast.
* If type is `image`, it will check whether it's base64 encoded and set the `img` HTML element `src` property accordingly.

## TODO

- [ ] Add json schema validation when importing cards.
- [ ] Add json schema validation when creating cards.
- [ ] Add multi language support.
- [ ] Add local encoder for uploaded images.