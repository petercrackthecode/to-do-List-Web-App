import React, { Component } from "react";
import "./styles/App.css";

import HandBellFlac from "./media/hand-bell.flac";
import HandBellWav from "./media/hand-bell.wav";

import ListTitle from "./components/ListTitle.js";
import CompletedList from "./components/CompletedList.js";
import ToDoList from "./components/ToDoList.js";
import Input from "./components/Input.js";
import ID from "./lambdaFnc/fnc.js";

// import from React Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const defaultTasksList = [
  "Build rocket",
  "Cover a high-speed wifi connection globally",
  "Meet alien",
  "Invent autodriving cars' system"
];

let tasksWithID = {};

defaultTasksList.map(aTask => (tasksWithID[ID()] = aTask));

class App extends Component {
  state = {
    m_listTitle: "My new list",
    m_input: "",
    m_taskList: {
      toDo: Object.assign({}, tasksWithID),
      completed: {}
    },
    m_isToDoOpen: true,
    m_isCompletedOpen: true
  };

  playSound = async () => {
    const audio = document.getElementById("beep");
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  };

  toggleToDo = async () => {
    this.setState(currentState => ({
      m_isToDoOpen: !currentState.m_isToDoOpen
    }));
  };

  toggleCompleted = async () => {
    this.setState(currentState => ({
      m_isCompletedOpen: !currentState.m_isCompletedOpen
    }));
  };

  deleteTask = async (from = "", taskID = "") => {
    let newTaskList = this.state.m_taskList;
    delete newTaskList[from][taskID];
    this.setState({ m_taskList: newTaskList });
  };

  shiftTask = async (from = "", to = "", taskID = "") => {
    let newTaskList = this.state.m_taskList;
    const task = newTaskList[from][taskID];
    delete newTaskList[from][taskID];

    newTaskList[to][taskID] = task;

    this.setState({ m_taskList: newTaskList });
  };

  addNewTask = async newTask => {
    let currentState = this.state;
    currentState.m_taskList.toDo[ID()] = newTask;
    this.setState(currentState);
  };

  changeInput = async newInput => {
    this.setState({
      m_input: newInput
    });
  };

  render() {
    const { m_listTitle, m_taskList } = this.state;
    const { toDo, completed } = m_taskList;

    return (
      <Container id="app">
        <Row>
          <ListTitle listTitle={m_listTitle} />
        </Row>
        <br />
        <Row>
          <Input
            addNewTask={this.addNewTask}
            changeInput={this.changeInput}
            input={this.state.m_input}
          />
        </Row>
        <Row>
          <ToDoList
            toDoList={toDo}
            toggleToDo={this.toggleToDo}
            isToDoOpen={this.state.m_isToDoOpen}
            shiftTask={this.shiftTask}
            deleteTask={this.deleteTask}
            playSound={this.playSound}
          />
        </Row>
        <Row>
          <CompletedList
            completedList={completed}
            toggleCompleted={this.toggleCompleted}
            isCompletedOpen={this.state.m_isCompletedOpen}
            shiftTask={this.shiftTask}
            deleteTask={this.deleteTask}
          />
        </Row>
        <audio id="beep" preload="auto">
          <source src={HandBellFlac}></source>
          <source src={HandBellWav}></source>
          Your browser doesn't support this media file.
        </audio>
      </Container>
    );
  }
}

export default App;
