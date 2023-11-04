# AgentOfDeath

## Running the backend locally
Prerequisite: poetry needs to be installed
First time setup:
```
cd backend
poetry config virtualenvs.in-project true
```
Everytime thereafter:
```
cd backend
poetry shell
poetry install --no-root
uvicorn main:app
```
`poetry shell` activates your shell in the postry virtual environment
`poetry install --no-root` installs the dependencies as required by the pyproject.toml
`uvicorn main:app` runs the app locally, listening to port 8000
