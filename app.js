async function fetchTodos() {
  const res = await fetch('/api/todos');
  const todos = await res.json();

  const list = document.getElementById('todo-list');
  list.innerHTML = '';
  todos.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.task}</strong><br><small>Added: ${new Date(item.timestamp).toLocaleString()}</small>`;
    list.appendChild(li);
  });
}

async function addTodo() {
  const input = document.getElementById('todo-input');
  const task = input.value.trim();
  if (task === '') return;

  await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  });

  input.value = '';
  fetchTodos();
}

window.onload = fetchTodos;
