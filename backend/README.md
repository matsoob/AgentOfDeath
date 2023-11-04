## Running Locally

Follow here to install poetry: https://python-poetry.org/docs/

Then you can run:

```
poetry config virtualenvs.in-project true
poetry shell
poetry install --no-root
uvicorn main:app
```

Now you have an app listening & serving on port 8000!
