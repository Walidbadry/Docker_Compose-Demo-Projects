from flask import Flask
import psycopg2

app = Flask(__name__)

def get_db_connection():
    conn = psycopg2.connect(
        host="postgres",
        database="python_db",
        user="postgres",
        password="example"
    )
    return conn

@app.route('/')
def index():
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute('SELECT 1 + 1 AS solution')
    solution = cur.fetchone()[0]
    cur.close()
    conn.close()
    return f"The solution is: {solution}"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
