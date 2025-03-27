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
    <button class="NEWCOLUMN" @click="openModal = true">ADD COLUMN</button>
  </div>

  <!-- Columns -->
  <div class="columns-container">
      <div
        v-for="column in columns"
        :key="column.id"
        class="column"
      >
        <h2>{{ column.name }}</h2>
        <button class="add-task-btn" @click="addTask(column.id)">
          NEW TASK
        </button>
        
        <div
          v-for="task in column.tasks"
          :key="task.id"
          class="task"
        >
          <p>{{ task.title }}</p>

        </div>
      </div>
    </div>

     <!-- Modal สำหรับ Add Column -->
     <div v-if="openModal" class="modal-overlay">
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
  tasks: Task[];
}

// State สำหรับเก็บข้อมูล column
const columns = ref<Column[]>([
  { id: 1, name: 'To Do', tasks: [] },
  { id: 2, name: 'Doing', tasks: [] },
  { id: 3, name: 'Done', tasks: [] }
]);

// State สำหรับควบคุม modal
const openModal = ref(false);
// State สำหรับเก็บชื่อคอลัมน์ใหม่
const colName = ref('');

// ฟังก์ชันปิด Modal
const closeModal = () => {
  openModal.value = false;
  colName.value = ''; // เคลียร์ค่าชื่อคอลัมน์
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
    tasks: []
  });

  closeModal();
};

// add task in column fuction
// ฟังก์ชันเพิ่ม Task ลงในคอลัมน์
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

.NEWCOLUMN {
  cursor: pointer;
  border-radius: 45px;
  letter-spacing: 1px;
  font-size: 24px;
  font-family: Prompt, Bold;
  color: #FFFFFF;
  background-color: #F61010;
  padding: 1px 20px;
  height: 80px;
  width: 200px;
  margin: 0px;
}
/*Column*/

.columns-container {
  display: flex;
  gap: 50px;
  margin-top: 50px;
  margin-left: 50px;
}
.column {
  background: #ddd;
  padding: 10px;
  min-width: 200px;
  border-radius: 5px;
}
.add-task-btn {
  margin-top: 10px;
  background: #f61010;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
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
  padding: 20px;
  text-align: left;
}
.modal-content h2 {
  margin: 0 0 10px 0;
}
.modal-body {
  margin-bottom: 20px;
}
.modal-body label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
.modal-body input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.modal-footer {
  text-align: right;
}
.modal-footer button {
  margin-left: 10px;
  padding: 8px 16px;
  cursor: pointer;
}


</style>
