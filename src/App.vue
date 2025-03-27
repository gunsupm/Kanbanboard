<template>
  <div class="header">
    <div class="nav-bar">
      <div class="left-content">
        <h1>KanBan Board</h1>
      </div>
      <div class="right-content">
        <router-link to="/login" class="user-icon">
          <img src="../pic/UserIcon.png" alt="User Icon">
        </router-link> 
      </div>
    </div>
  </div>
  <div class="content">
    <div class="title">
      <h1 v-if="!isEditing">{{ titleText[0].name }}</h1> 
      <input type="text" maxlength="9"  v-else v-model="newTitle" @keyup.enter="saveTitle"@blur="saveTitle"/>
      </div>
    <button class="editred" @click="toggleEdit">
      <img src="../pic/editredicon.png" />
    </button>
    <button class="ADDTASKBTN" @click="openTaskModal"> NEW TASK </button>
  </div>
  <!-- Modal สำหรับ Add Task -->
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
            <button @click="addTag">Add New Tag</button>
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
            <button @click="addMember">Add New Member</button>
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

  <!-- Columns -->
  <div class="columns-container">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
        :style="{ backgroundColor: column.color }"
      >
        <h2>{{ column.name }}</h2>
        <div
          v-for="task in column.tasks"
          :key="task.id"
          class="task"
        >
          <p class="task-name">{{ task.title }}</p>
          <!-- แสดง Tags -->
          <div class="tag-container">
            <span
              v-for="(tag, idx) in task.labels"
              :key="idx"
              class="tag"
            >
              #{{ tag }}
            </span>
          </div>
          <!-- แสดง Members -->
          <div class="member-container">
            <span
              v-for="(member, idx) in task.assignees"
              :key="idx"
              class="member"
            >
              @{{ member }}
            </span>
          </div>
        </div>
      </div>
      <div class="ADDCOL">
      <button class="NEWCOLUMN" @click="openModalAddCol = true">ADD COLUMN</button></div>
    </div>
     <!-- Modal Add Column -->
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
            placeholder="Column Color(ex.#ffffff)..."
            type="color"
          />
        </div>
        <div class="modal-footer">
          <button @click="confirmAddColumn">Done</button>
          <button @click="closeModal">Cancel</button>
        </div>
      </div>
    </div>
    

  <router-view/>
</template>

<script setup lang="ts">
import { ref } from 'vue';

//สร้าง interface task and column
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

// เก็บข้อมูล column
const columns = ref<Column[]>([
  {
    id: 1,
    name: 'To Do',
    color: '#f5f5f5',
    tasks: [
      {
        id: 101,
        title: 'List function for our website',
        labels: ['UI'],
        assignees: ['Gamer']
      },
      {
        id: 102,
        title: 'Design website',
        labels: [],
        assignees: ['Gamer']
      }
    ]
  },
  ]);
// State สำหรับควบคุม modal
const openModalAddCol = ref(false);
// State สำหรับเก็บชื่อคอลัมน์ใหม่
const colName = ref('');
// State สำหรับเก็บสีคอลัมน์ใหม่
const colColor = ref('#ffffff');

// ฟังก์ชันปิด Modal
const closeModal = () => {
  openModalAddCol.value = false;
  colName.value = ''; // เคลียร์ค่าชื่อคอลัมน์
  colColor.value = '#ffffff';
};

// ฟังก์ชันสร้างคอลัมน์ใหม่
const confirmAddColumn = () => {
  if (!colName.value.trim()) {
    alert('Please enter column name');
    return;
  }

  columns.value.push({
    id: Date.now(),  // ใช้ timestamp หรือ uuid ก็ได้
    name: colName.value,
    color: colColor.value,
    tasks: []
  });

  closeModal();
};

// add task in column fuction
const addTask = (columnId: number) => {
  const column = columns.value.find((col) => col.id === columnId);
  if (!column) return;

  column.tasks.push({
    id: Date.now(),
    title: `New Task ${column.tasks.length + 1}`,
    labels: [],
    assignees: []
  });
};
// สร้าง reactive state ด้วย ref
const isEditing = ref(false);
const titleText = ref([{ name: 'Todo' }]);
const newTitle = ref('');


// ฟังก์ชัน toggleEdit
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
  if (isEditing.value) {
    newTitle.value = titleText.value[0].name;
  }
};

// ฟังก์ชัน saveTitle
const saveTitle = () => {
  if (newTitle.value.trim().length === 0) {
    titleText.value[0].name = 'Name..';
  } else {
    titleText.value[0].name = newTitle.value;
  }
  isEditing.value = false;
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

.user-icon img {
  width: 50px;
  height: auto;
  margin-right: 60px;
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
  margin-right: 50px;
  justify-content: center;
  width: 200px;
  height: 70px;
}

.title input {
  font-size: 36px; /* ขนาดตัวอักษร */
  color: #F60000;
  background-color: #f8f8f8;
  font-family: Prompt, sans-serif; /* ฟอนต์ที่ใช้ */
  font-weight: bold; /* น้ำหนักตัวอักษร */
  border: 0 ; /* ขอบของ input */
  padding: 10px 40px; /* ระยะห่างภายใน */
  margin: 0px;
  width: 200px;
  height: 70px;
  text-align: center; /* จัดข้อความให้อยู่กลาง */
}

.editred {
  background-color: white;
  cursor: pointer;
  border: 0px;  
  margin-top: 20px;
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

.ADDCOL{
  z-index: -1;
  border-radius: 8px;
  width: 150px;
  max-width: 90%;
  height: 100vh;
  bottom: 0;
  padding: 0px;
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

.task {
  background: white;
  padding: 5px;
  margin-top: 5px;
  border-radius: 3px;
}

/* Modal */
.modal-overlay {
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

.modal-content {
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
.modal-content h2 {
  margin: 20px 0 10px 30px;
}
.modal-body {
  margin-bottom: 20px;
}
.modal-body label {
  margin: 30px 0 10px 30px;
  font-size: 25px;
  display: block;
  font-weight: bold;
}
.modal-body input[type="text"] {
  margin-left: 50px;
  font-size: 20px;
  width: 300px;
  height: 50px;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}
.modal-body input[type="color"] {
  border: 5px solid #000000;
  margin-top: 20px;
  margin-left: 50px;
  width: 300px;
  height: 300px;
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;
}

.modal-footer {
  text-align: right;
}
.modal-footer button {
  margin-top: 50px;
  margin-left: 10px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
