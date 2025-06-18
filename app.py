from flask import Flask, render_template_string, request, redirect, url_for, session
import random

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Needed for session management

# Placeholder for game logic imports
# from game import start_game, process_action

@app.route('/', methods=['GET', 'POST'])
def index():
    if 'game_state' not in session:
        session['game_state'] = {'step': 0, 'log': []}
    if request.method == 'POST':
        action = request.form.get('action')
        # Here you would process the action and update the game state
        session['game_state']['log'].append(f'You chose: {action}')
        session['game_state']['step'] += 1
        return redirect(url_for('index'))
    log = session['game_state']['log']
    return render_template_string('''
        <h1>Murder Mystery Game (Web Version)</h1>
        <form method="post">
            <input name="action" placeholder="Type your action (e.g., interview, examine, accuse)">
            <input type="submit" value="Submit">
        </form>
        <h2>Game Log:</h2>
        <ul>
        {% for entry in log %}
            <li>{{ entry }}</li>
        {% endfor %}
        </ul>
        <form method="post" action="/reset">
            <button type="submit">Restart Game</button>
        </form>
    ''', log=log)

@app.route('/reset', methods=['POST'])
def reset():
    session.pop('game_state', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
