<template>
    <div class="header">
      <div class="nav-bar">
        <div class="left-content">
          <h1>KanBan Board</h1>
        </div>
        <div class="right-content">
          <label for="loginPage">Hello<span>{{ loginName }}</span></label>
        <router-link to="/Board" class="user-icon">
            <img src="@/assets/pic/UserIcon.png" alt="User Icon">
          </router-link> 
          <router-link to="/" >
          <button class="logoutbtn" @click="Logout"> <p>Logout</p></button>
        </router-link> 
        </div>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <h1 v-if="!isEditing">{{ titleText[0].name }}</h1> 
        <input type="text" maxlength="9"  v-else v-model="newTitle" @keyup.enter="saveTitle "@blur="saveTitle"/>
        <button  @click="saveTitle" v-if="isEditing"><p>Save</p></button>
        </div>
      <button class="editred" @click="toggleEdit">
        <img src="@/assets/pic/editredicon.png" />
      </button>
      <button class="ADDTASKBTN"  @click="openTaskModal = true"> NEW TASK </button>
    </div>
    <!-- Modal สำหรับ Add Task -->
     <div id="Task">
    <div v-if="openTaskModal" class="modal-overlay">
        <div class="modal-content">
          <h2>NEW TASK</h2>
          <div class="modal-body">
            <!-- เลือก Column -->
            <label>Choose Column</label>
            <select v-model="selectedColumnId">
              <option disabled value="">Select column...</option>
              <option
                v-for="column in columns"
                :key="column.id"
                :value="column.id"
              >
                {{ column.name }}
              </option>
            </select>
  
            <!-- Task Name -->
            <label>Task name</label>
            <input
              v-model="taskName"
              placeholder="Task name..."
              type="text"
            />
  
            <!-- Tag -->
            <label>Tag</label>
            <div class="tag-input-area">
              <input
                v-model="tagInput"
                placeholder="name..."
                type="text"
              />
              <button @click="addTag">ADD TAG</button>
            </div>
            <!-- แสดงรายการ Tag ที่ผู้ใช้เพิ่ม -->
            <div class="tag-list">
              <span
                v-for="(tag, idx) in tags"
                :key="idx"
                class="tag"
              >
                #{{ tag }}
              </span>
            </div>
  
            <!-- Member -->
            <label>Member</label>
            <div class="member-input-area">
              <input
                v-model="memberInput"
                placeholder="@..."
                type="text"
              />
              <button @click="addMember">ADD MEMBER</button>
            </div>
            <!-- แสดงรายการ Member ที่ผู้ใช้เพิ่ม -->
            <div class="member-list">
              <span
                v-for="(member, idx) in members"
                :key="idx"
                class="member"
              >
                @{{ member }}
              </span>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="confirmAddTask">Done</button>
            <button @click="closeTaskModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  
    <Draggable
  v-model="columns"
  group="columns"
  item-key="id"
  @end="onColumnsReorder"
  tag="div"
  class="columns-container"
>
  <template #item="{ element }">
    <div class="column" :style="{ backgroundColor: element.color }">
      <div class="column-header">
        <h2>{{ element.name }}</h2>
        
        <!-- Edit Column BTN-->
        <button class="column-menu-button" @click="toggleColumnMenu(element.id)">
          <img class="edit-column" src="../assets/pic/moreicon.png" alt="Edit">
        </button>
        <!-- Dropdown Menu for Column -->
        <div v-if="menuOpenColumnId === element.id"  class="column-menu-dropdown">
          <button class="EditCL" @click="openEditColumnModal(element)">Edit</button>
        <br>
          <button class="DelCL" @click="deleteColumn(element)">Delete</button>
      </div>
      </div>

      <!-- Draggable for Tasks in Column -->
      <Draggable
        v-model="element.tasks"
        group="tasks"
        item-key="id"
        :options="{ dropOnEmpty: true }"
        @end="onTaskReorder"
        tag="div"
        class="task-container"
      >
        <template #item="{ element: task }">
          <div class="task">
            <div class="task-header">
              <p class="task-name">{{ task.title }}</p>
              <div class="task-edit">
              <button class="edit-task" @click="openEditTaskModalFunc(task, element)">✏️ </button>
              <button class="delete-task" @click="deleteTask(task, element)">🗑️</button>

              </div>
            </div>
            <div class="tag-container">
              <span v-for="(tag, idx) in task.labels" :key="idx" class="tag">
                {{ tag }}
              </span>
            </div>
            <div class="member-container">
              <span v-for="(member, idx) in task.assignees" :key="idx" class="member">
                @{{ member }}
              </span>
            </div>
          </div>
        </template>
      </Draggable>
    </div>
  </template>
</Draggable>

  
  <div class="ADDCOL">
      <button class="NEWCOLUMN" @click="openModalAddCol = true">ADD COLUMN</button>
    </div>

    
   <!-- Modal Edit Column -->
<div id="EditColumn">
  <div v-if="openEditColumnModalFlag" class="modal-overlay">
    <div class="modal-content">
      <h2>EDIT COLUMN</h2>
      <div class="modal-body">
        <label for="editColName">Column Name</label>
        <input id="editColName" v-model="editColumnData.name" type="text" placeholder="Column name..." />
        <label for="editColColor">Column Color</label>
        <input id="editColColor" v-model="editColumnData.color" type="color" />
      </div>
      <div class="modal-footerbtn">
        <button class="Done" @click="updateColumn">Done</button>
        <button class="Cancle" @click="closeEditColumnModal">Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Modal Edit Task -->
<div id="EditTask">
  <div v-if="openEditTaskModal" class="modal-overlay">
    <div class="modal-content">
      <h2>EDIT TASK</h2>
      <div class="modal-body">

        <!-- Task Name -->
        <label>Task name</label>
        <input v-model="editTaskName" placeholder="Task name..." type="text" />
      <div class="modal-footer">
        <button @click="updateTask">Done</button>
        <button @click="closeEditTaskModal">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>



       <!-- Modal Add Column -->
      <div id="Column">
       <div v-if="openModalAddCol" class="modal-overlay">
        <div class="modal-content">
          <h2>ADD COLUMN</h2>
          <div class="modal-body">
            <label for="colName">Column Name</label>
            <input
              id="colName"
              v-model="colName"
              placeholder="Column name..."
              type="text"
            />
  
            <label for="colColor">Column Color</label>
            <input
              id="colColor"
              v-model="colColor"
              placeholder=""
              type="color"
            />
          </div>
          <div class="modal-footerbtn">
            <button class="Done" @click="confirmAddColumn">Done</button>
            <button class="Cancle" @click="closeModal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  
    <router-view/>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted } from 'vue';
  import Draggable from 'vuedraggable';
  
  const loginName = ref('');

  //ดึงข้อมูลหน้า Login จาก Local มาใช้แสดงใน Label Navbar

    onMounted(() => {
      loginName.value = localStorage.getItem('loginName') || 'Guest'
    })
  
// Logout 
const Logout = () => {
  //Clare Login Data
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('loginName')
}

  interface Task {
    id: number;
    title: string;
    labels: string[];
    assignees: string[];
  }
  
  interface Column {
    id: number;
    name: string;
    color: string;
    tasks: Task[];
  }

  // Load & Save Columns
  const columns = ref<Column[]>([]);

  onMounted(() => {
      const storedColumns = localStorage.getItem('kanbanColumns');
      if (storedColumns) {
        columns.value = JSON.parse(storedColumns);
      } else {
        columns.value = [
          {
            id: 1,
            name: 'To Do',
            color: '#7D74FF',
            tasks: [
              {
                id: 101,
                title: 'List function for our website',
                labels: ['UX'],
                assignees: ['James', 'Game']
              },
              {
                id: 102,
                title: 'Design website',
                labels: ['Ui'],
                assignees: ['Gunner']
              }
            ]
          },
          {
            id: 2,
            name: 'Doing',
            color: '#00B2FF',
            tasks: [
              {
                id: 201,
                title: 'Create Kanban website',
                labels: ['Main'],
                assignees: ['All']
              }
            ]
          },
          {
            id: 3,
            name: 'Done',
            color: '#16A816',
            tasks: [
              {
                id: 301,
                title: 'Dealing with clients',
                labels: ['Deal', 'Cust'],
                assignees: ['Jane', 'Fore']
              }
            ]
            
          }
        ];
      }
    });

  watch(columns, (newColumns) => {
    localStorage.setItem('kanbanColumns', JSON.stringify(newColumns));
  }, { deep: true });

  // Drag Events
  const onTaskReorder = (event: any) => {
    console.log('Task reordered or moved:', event);
  };
  
  const onColumnsReorder = (event: any) => {
    console.log('Columns reordered:', event);
  };
  
  // Modal Add Task
  const openTaskModal = ref(false);
  const selectedColumnId = ref<number | ''>('');
  const taskName = ref('');
  const tags = ref<string[]>([]);
  const members = ref<string[]>([]);
  const tagInput = ref('');
  const memberInput = ref('');
  
  const closeTaskModal = () => {
    openTaskModal.value = false;
    selectedColumnId.value = '';
    taskName.value = '';
    tags.value = [];
    members.value = [];
    tagInput.value = '';
    memberInput.value = '';
  };
  
  const addTag = () => {
    const newTag = tagInput.value.trim();
    if (newTag) {
      tags.value.push(newTag);
      tagInput.value = '';
    }
  };
  
  const addMember = () => {
    const newMember = memberInput.value.trim();
    if (newMember) {
      members.value.push(newMember);
      memberInput.value = '';
    }
  };
  
  const confirmAddTask = () => {
    if (!selectedColumnId.value) {
      alert('Please select a column');
      return;
    }
    if (!taskName.value.trim()) {
      alert('Please enter a task name');
      return;
    }
    const column = columns.value.find(col => col.id === selectedColumnId.value);
    if (!column) {
      alert('Column not found');
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: taskName.value,
      labels: tags.value,
      assignees: members.value
    };
    column.tasks.push(newTask);
    closeTaskModal();
  };
  
  // Modal Add Column
  const openModalAddCol = ref(false);
  const colName = ref('');
  const colColor = ref('#000000');
  
  const closeModal = () => {
    openModalAddCol.value = false;
    colName.value = '';
    colColor.value = '#ffffff';
  };
  
  const confirmAddColumn = () => {
    if (!colName.value.trim()) {
      alert('Please enter column name');
      return;
    }
    columns.value.push({
      id: Date.now(),
      name: colName.value,
      color: colColor.value,
      tasks: []
    });
    closeModal();
  };
  
  // Title Editing
  const isEditing = ref(false);
  const titleText = ref([{ name: 'Todo' }]);
  const newTitle = ref('');
  
  const toggleEdit = () => {
    isEditing.value = !isEditing.value;
    if (isEditing.value) {
      newTitle.value = titleText.value[0].name;
    }
  };
  
  const saveTitle = () => {
    titleText.value[0].name = newTitle.value.trim() || 'Name..';
    isEditing.value = false;
  };
  
  // Column Edit / Delete
  const menuOpenColumnId = ref<number | null>(null);
  const toggleColumnMenu = (columnId: number) => {
    menuOpenColumnId.value = menuOpenColumnId.value === columnId ? null : columnId;
  };
  
  const deleteColumn = (column: Column) => {
    if (confirm(`Delete column "${column.name}"?`)) {
      columns.value = columns.value.filter(c => c.id !== column.id);
    }
  };
  
  // Modal Edit Column
  const openEditColumnModalFlag = ref(false);
  const editColumnData = ref<{ id: number; name: string; color: string }>({ id: 0, name: '', color: '' });
  
  const openEditColumnModal = (column: Column) => {
    editColumnData.value = { ...column };
    openEditColumnModalFlag.value = true;
    menuOpenColumnId.value = null;
  };
  
  const closeEditColumnModal = () => {
    openEditColumnModalFlag.value = false;
  };
  
  const updateColumn = () => {
    const idx = columns.value.findIndex(c => c.id === editColumnData.value.id);
    if (idx !== -1) {
      // คงค่า tasks เดิมไว้
      columns.value[idx] = {
        ...columns.value[idx],
        name: editColumnData.value.name,
        color: editColumnData.value.color
      };
    }
    closeEditColumnModal();
  };
  
  // Modal Edit Task
  const openEditTaskModal = ref(false);
  const editTaskId = ref<number>(0);
  const selectedEditTaskColumnId = ref<number | ''>('');
  const editTaskName = ref('');
  const editTags = ref<string[]>([]);
  const editMembers = ref<string[]>([]);
  
  const openEditTaskModalFunc = (task: Task, column: Column) => {
    editTaskId.value = task.id;
    selectedEditTaskColumnId.value = column.id;
    editTaskName.value = task.title;
    editTags.value = [...task.labels];
    editMembers.value = [...task.assignees];
    openEditTaskModal.value = true;
  };
  
  const updateTask = () => {
    const column = columns.value.find(col => col.id === selectedEditTaskColumnId.value);
    if (!column) {
      alert('Column not found');
      return;
    }
    const taskIndex = column.tasks.findIndex(t => t.id === editTaskId.value);
    if (taskIndex !== -1) {
      column.tasks[taskIndex] = {
        id: editTaskId.value,
        title: editTaskName.value,
        labels: editTags.value,
        assignees: editMembers.value
      };
    }
    closeEditTaskModal();
  };
  
  const closeEditTaskModal = () => {
    openEditTaskModal.value = false;
  };
  
  const deleteTask = (task: Task, column: Column) => {
  if (confirm(`Delete task "${task.title}"?`)) { 
    column.tasks = column.tasks.filter(t => t.id !== task.id);
  }
};

  </script>
  
  

  <style>
  @import url("https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  #app {
    text-align: center;
    font-family: Prompt;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    justify-content: center;
  }
  
  /*Nav Bar*/ 
  .nav-bar {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    padding: 15px 20px;
    background-color: #F5F5F5;
  }
  
  .left-content h1 {
    color: #F60000;
    margin-left: 100px; 
  }

  .right-content {
    display: flex;
    gap: 10px ;
    align-items: center;
    text-transform: uppercase;
  }
  
  .right-content label{
  margin-top: 10px;
   color: #F60000;
   font-size: 20px;
  }

  .right-content span{
   margin-left: 5px;
   color: #000000;
   font-size: 20px;
  }

  .logoutbtn{
    background-color: #F5F5F5;
    border: 0px;
    margin-right: 25px;
    font-size: 12px;
    display: inline-flex;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s; 
}

.logoutbtn:hover{
  color: red;
}


.user-icon {
  width: 40px;
  height: auto; 
  object-fit: contain; 
}
  
  /*Content*/ 
  .content {
    display: flex;
    margin-top: 150px; 
    margin-left: 120px;
  }
  
  .title {
    font-size: 18px;
    align-items: center;
    font-family: Prompt, Bold;
    display: inline-flex;
    border: 3px solid #000000;
    padding: 10px 40px;
    margin: 0px;
    margin-right: 10px;
    justify-content: center;
    width: 200px;
    height: 70px;
    flex-direction: column;
    gap: 25px;
  }
  
  .title input {
    font-size: 36px; 
    color: #F60000;
    background-color: #F5F5F5;
    font-family: Prompt, sans-serif; 
    font-weight: bold; 
    border: 0px ; 
    padding: 10px 40px; 
    margin: 0px;
    width: 200px;
    height: 70px;
    margin-top:0px;
    text-align: center;

  }
  .title button{
    border: 2px solid #000;
    border-radius: 10px;
    width: 100px;
    font-size: 15px;
    cursor: pointer;
    background-color: #F60000;
    color: white;
    font-weight: bold;
    letter-spacing: 0.5px;
    z-index: 1000;
  }
  .title button:hover{
    background-color: #28a745;
  }

  .editred {
    background-color: white;
    cursor: pointer;
    border: 0px;  
    margin-top: 0px;
    margin-right: 50px;
  }
  
  /*btn*/
  
  .ADDTASKBTN{
    cursor: pointer;
    border-radius: 45px;
    font-size: 15px;
    font-weight: bold;
    color: #FFFFFF;
    letter-spacing: 1px;
    background-color: #F61010;
    padding: 1px 20px;
    height: 70px;
    width: 200px;
    margin: 0px;
  }
  
  .ADDCOL {
    border-radius: 8px;
    width: 150px;
    max-width: 90%;
    height: 100vh;
    bottom: 0;
    padding: 0;
    margin-top: 30px;
    margin-left: 1500px;
  }
  
  
  .NEWCOLUMN {
    cursor: pointer;
    border-radius: 45px;
    letter-spacing: 1px;
    font-size: 15px;
    font-weight: bold;
    color: #FFFFFF;
    background-color: #F61010;
    padding: 1px 20px;
    height: 70px;
    width: 200px;
    align-items: end;
  }
  
  /*Column*/

  .column-menu-dropdown {
  position: absolute;
  right: 0;
  top: calc(100% + 5px); /* ปรับระยะห่างจากปุ่มตามต้องการ */
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  text-align: left;
  z-index: 10;
}
.column-menu-dropdown button {
  display: block;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 5px;
  border: none;
  border-radius: 4px;
  background-color: #fff;
  font-size: 16px;
  text-align: left;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.column-menu-dropdown button:hover {
  background-color: #c5c5c5;
}

.EditCL {
  color: #007bff; 
}

.DelCL {
  color: #dc3545; 
}

.column-menu-dropdown button:focus {
  outline: none;
  background-color: #e9ecef;
}


  .column-header {
  position: relative;
  text-align: center; /* จัดให้ h2 อยู่ตรงกลาง */
  padding: 0 20px;    /* ปรับ padding ตามที่ต้องการ */
}

.column-header h2 {
  margin: 0;
}

.column-menu-button {
  position: absolute;     
  left: 85%;;    
  top: 50%;
  transform: translateY(-50%); /* จัดแนวแกนตั้งให้ตรงกลาง */
  background: transparent;
  border: none;
  cursor: pointer;
}


  .columns-container {
    display: flex;
    gap: 50px;
    margin-top: 50px;
    margin-left: 70px;
    align-items: stretch;
  }
  .column {
    font-weight: bold;
    background: #ddd;
    color: #FFFFFF;
    min-height: 100px;
    flex-direction: column;
    min-height: 500px;
    padding: 10px;
    width: 400px;
    height: auto ;
    min-height: auto;
    border-radius: 5px;
  }
  
  /*Task*/ 
  .task {
    background: white;
    padding: 5px;
    margin-top: 5px;
    border-radius: 3px;
    text-align: left;
  }
  .task-container {
    min-height: 150px; 
    border: 3px dashed #f1f1f1; 
    padding: 10px;
  }
  
  .task-name {
    font-weight: bold;
    color: #000000;
    margin-left: 10px;
  }
  .tag-container
  .member-container {
    margin-top: 5px;
  min-height: 50px; 
  }
  .tag{
    color: #ffffff;
    background-color: #F60000;
    margin-left: 10px;
    border-radius: 10px;
    padding: 3px 10px ;
    font-size: 14px;
  }
  .member {
    display: inline-block;
    color: #333;
    border-radius: 3px;
    padding: 3px 6px;
    margin-top: 10px;
    margin-right: 5px;
    font-size: 14px;
  }
  .tag-list,
  .member-list {
    margin: 10px 0;
  }
  .tag-input-area,
  .member-input-area {
    display: flex;
    gap: 5px;
  }
  .member-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 15px;
  }
  .member {
    color: #000000;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 20px;
  }
  /* Modal Column */

  .edit-column{
    width: 52px;
    height: auto;
  }
  #Column .modal-overlay {
    z-index: 1001;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.089); /* ความโปร่งของฉากหลัง */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #Column .modal-content {
    background: #fff;
    border-radius: 8px;
    border: 3px solid #000000;
    width: 400px;
    max-width: 90%;
    height: 800px;
    padding: 20px;
    text-align: left;
    font-size: 28px;
  }
  #Column .modal-content h2 {
    margin: 20px 0 10px 30px;
  }
  #Column .modal-body {
    margin-bottom: 20px;
  }
  #Column .modal-body label {
    margin: 30px 0 10px 30px;
    font-size: 25px;
    display: block;
    font-weight: bold;
  }
  #Column .modal-body input[type="text"] {
    margin-left: 50px;
    font-size: 20px;
    width: 300px;
    height: 50px;
    padding: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  #Column .modal-body input[type="color"] {
    border: 5px solid #000000;
    margin-top: 20px;
    margin-left: 50px;
    width: 300px;
    height: 300px;
    padding: 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  #Column .modal-footerbtn {
    text-align: right;
  }
  #Column .modal-footerbtn button {
    margin-top: 50px;
    margin-left: 10px;
    padding: 8px 16px;
    cursor: pointer;
  }
  #Column .Done{
    background-color: #28a745; 
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    padding: 10px 15px;
    width: 100px;
    cursor: pointer;
  }
  #Column .Done:hover{
    background-color: #ffffff;
    color: #28a745;
  }
  #Column .Cancle{
    background-color: #F60000; 
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    padding: 10px 15px;
    width: 100px;
    cursor: pointer;
  }
  
  #Column .Cancle:hover{
    color: #ffffff;
    background-color: #F60000; 
  }

      /* Card Modal */ 
  #Task .modal-overlay {
    position: fixed; 
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.342); 
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: left;
    z-index: 1000; 
  }
  #Task .modal-content {
    background: #fff;
    border-radius: 8px;
    border: 3px solid #000000;
    width: 600px;
    max-width: 90%;
    height: auto;
    padding: 70px ; 
    text-align: left;
    font-size: 28px;
  }
  #Task .modal-content h2 {
    margin: 20px 0 10px 30px;
  }
  #Task .modal-body {
    margin-bottom: 20px;
  }
  #Task .modal-body label {
    margin: 30px 0 10px 30px;
    font-size: 25px;
    display: block;
    font-weight: bold;
  }
  
  #Task .modal-body input[type="text"],
  .modal-body select {
    width: calc(100% - 22px); 
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  #Task .modal-body select {
    cursor: pointer;
  }
  
  #Task .tag-input-area,
  .member-input-area {
    display: flex;
    
    gap: 10px;
    margin-bottom: 15px;
  }
  #Task .tag-input-area input,
  .member-input-area input {
    flex: 1;
  }
  #Task .tag-input-area button {
    padding: 10px 15px;
    background-color: #F61010; 
    color: #ffffff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
  }
  .member-input-area button {
    padding: 10px 15px;
    color: #fff;
    border: none;
    border-radius: 4px;
    background-color: #F61010; 
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
  
  }
  #Task .tag-input-area button:hover,
  .member-input-area button:hover {
    background-color: white; 
    color: #F61010;
  }
  #Task .tag-list,
  #Task .modal-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  #Task .modal-footer button {
    margin-top: 30px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  #Task .modal-footer button:first-child {
    background-color: #28a745; 
    border: none;
    border-radius: 4px;
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 15px;
    width: 100px;
  }
  #Task .modal-footer button:first-child:hover {
    color: #28a745;
    background-color: #ffffff;
  }
  #Task .modal-footer button:last-child {
    background-color: #dc3545; 
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    cursor: pointer;
    padding: 10px 15px;
    width: 100px;
  }
  #Task .modal-footer button:last-child:hover {
    color: #c82333; 
    background-color: #ffffff;
  }
  /* Modal Edit Column */
#EditColumn .modal-overlay {
    z-index: 1001;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.089); /* ความโปร่งของฉากหลัง */
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  #EditColumn .modal-content {
    background: #fff;
    border-radius: 8px;
    border: 3px solid #000000;
    width: 400px;
    max-width: 90%;
    height: 800px;
    padding: 20px;
    text-align: left;
    font-size: 28px;
  }
  #EditColumn .modal-content h2 {
    margin: 20px 0 10px 30px;
  }
  #EditColumn .modal-body {
    margin-bottom: 20px;
  }
  #EditColumn .modal-body label {
    margin: 30px 0 10px 30px;
    font-size: 25px;
    display: block;
    font-weight: bold;
  }
  #EditColumn .modal-body input[type="text"] {
    margin-left: 50px;
    font-size: 20px;
    width: 300px;
    height: 50px;
    padding: 8px;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  #EditColumn .modal-body input[type="color"] {
    border: 5px solid #000000;
    margin-top: 20px;
    margin-left: 50px;
    width: 300px;
    height: 300px;
    padding: 0;
    box-sizing: border-box;
    cursor: pointer;
  }
  
  #EditColumn .modal-footerbtn {
    text-align: right;
  }
  #EditColumn .modal-footerbtn button {
    margin-top: 50px;
    margin-left: 10px;
    padding: 8px 16px;
    cursor: pointer;
  }
  #EditColumn .Done{
    background-color: #28a745; 
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    padding: 10px 15px;
    width: 100px;
    cursor: pointer;
  }
  #EditColumn .Done:hover{
    background-color: #ffffff;
    color: #28a745;
  }
  #EditColumn .Cancle{
    background-color: #F60000; 
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    color: #fff;
    border: 2px solid black;
    font-weight: bold;
    border-radius: 10px;
    padding: 10px 15px;
    width: 100px;
    cursor: pointer;
  }
  
  #EditColumn .Cancle:hover{
    color: #ffffff;
    background-color: #F60000; 
  }

  /* Style สำหรับ Edit Task Modal */
#EditTask .modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); /* ปรับความโปร่งใส */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001; /* ให้ modal อยู่ชั้นบนสุด */
}

#EditTask .modal-content {
  background: #fff;
  border-radius: 8px;
  border: 3px solid #000;
  width: 400px;
  max-width: 90%;
  padding: 20px;
  text-align: left;
  font-size: 28px;
}

#EditTask .modal-content h2 {
  margin: 20px 0 10px 30px;
}

#EditTask .modal-body {
  margin-bottom: 20px;
}

#EditTask .modal-body label {
  margin: 30px 0 10px 30px;
  font-size: 25px;
  font-weight: bold;
  display: block;
}

#EditTask .modal-body input[type="text"],
#EditTask .modal-body select {
  margin-left: 50px;
  font-size: 20px;
  width: 300px;
  height: 50px;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

/* Footer ที่ใช้ class .modal-footer */
#EditTask .modal-footer {
  text-align: right;
  margin-top: 30px;
}

#EditTask .modal-footer button {
  margin-left: 10px;
  padding: 10px 15px;
  cursor: pointer;
  width: 100px;
}

/* ปุ่ม Done */
#EditTask .modal-footer button:first-child {
  background-color: #28a745;
  border: 2px solid black;
  border-radius: 10px;
  color: #fff;
}

#EditTask .modal-footer button:first-child:hover {
  background-color: #ffffff;
  color: #28a745;
}

/* ปุ่ม Cancel */
#EditTask .modal-footer button:last-child {
  background-color: #F60000;
  border: 2px solid black;
  border-radius: 10px;
  color: #fff;
}

#EditTask .modal-footer button:last-child:hover {
  background-color: #F60000;
  color: #ffffff;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-task,
.delete-task {
  margin-left: 5px;
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #000;
}


  </style>
  