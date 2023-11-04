# __main__.py
import os
import subprocess
import sys

if __name__ == "__main__":
    command = [sys.executable, "-m", "uvicorn", "cancel_api.app:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
    subprocess.run(command)
