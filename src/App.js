import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// 看板组件
const KanbanCard = ({ title, status }) => {
  return (
    <li className='kanban-card'>
      <div className='card-title'>{title}</div>
      <div className='card-status'>{status}</div>
    </li>
  )
}

// 添加新卡片组件
const KanbanNewCard = ({ onSubmit }) => {

  const [title, setTitle] = useState('')
  const handleChange = (evt) => {
    setTitle(evt.target.value)
  }
  const handlekeyDown = (evt) => {
    if (evt.key === 'Enter') {
      onSubmit(title)
    }
  }

  return (
    <li className='kanban-card'>
      <h3>添加新卡片</h3>
      <div className='card-title'>
        <input type="text" value={title}
          onChange={handleChange} onKeyDown={handlekeyDown} />
      </div>
    </li>
  )
}

function App() {

  const [showAdd, setShowAdd] = useState(false);
  const [todoList, setTodoList] = useState([
    { title: '开发任务-1', status: '22-05-22 18:15' },
    { title: '开发任务-3', status: '22-05-22 18:15' },
    { title: '开发任务-5', status: '22-05-22 18:15' },
    { title: '测试任务-3', status: '22-05-22 18:15' }
  ])
  const [ongoingList, setOngoingList] = useState([
    { title: '开发任务-4', status: '22-05-22 18:15' },
    { title: '开发任务-6', status: '22-05-22 18:15' },
    { title: '测试任务-2', status: '22-05-22 18:15' }
  ])
  const [doneList, setDoneList] = useState([
    { title: '开发任务-2', status: '22-05-22 18:15' },
    { title: '测试任务-1', status: '22-05-22 18:15' }
  ])
  const handleAdd = (evt) => {
    setShowAdd(true)
  }
  const handleSubmit = (title) => {
    // todoList.unshift({ title, status: new Date().toDateString() })
    setTodoList(currentTodoList => [
      { title, status: new Date().toDateString() },
      ...currentTodoList
    ])
    // setShowAdd(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>我的看板</h2>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main className='kanban-board'>
        <section className='kanban-column column-todo'>
          <h2>待处理<button onClick={handleAdd}
            disabled={showAdd}>&#8853; 添加新卡片</button></h2>
          <ul>
            {showAdd && <KanbanNewCard onSubmit={handleSubmit} />}
            {todoList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
        <section className='kanban-column column-ongoing'>
          <h2>进行中</h2>
          <ul>
            {ongoingList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
        <section className='kanban-column column-done'>
          <h2>已完成</h2>
          <ul>
            {doneList.map(props => <KanbanCard {...props} />)}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
