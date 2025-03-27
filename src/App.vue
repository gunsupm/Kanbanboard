<template>
  class="columns-container"
  
  <div class="header">
    <div class="nav-bar">
      <div class="left-content">
        <h1>KanBan Board</h1>
      </div>
      <div class="right-content">
        <router-link to="/login" class="user-icon" >
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
      <h2>{{ element.name }}</h2>
      
      <!-- Draggable สำหรับ Tasks ในแต่ละ Column -->
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
            <p class="task-name">{{ task.title }}</p>
            
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
import { ref } from 'vue';
import Draggable from 'vuedraggable';
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
    color: '#ff0965',
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
  {
    id: 2,
    name: 'Doing',
    color: '#add8e6',
    tasks: [
      {
        id: 201,
        title: 'Create Kanban website',
        labels: ['API'],
        assignees: ['Gunner']
      }
    ]
  },
  {
    id: 3,
    name: 'Done',
    color: '#90ee90',
    tasks: [
      {
        id: 301,
        title: 'Dealing with clients',
        labels: ['Cust'],
        assignees: ['Jane','Fore']
      }
    ]
  }
]);

// Event  drag Task
const onTaskReorder = (event: any) => {
  console.log('Task reordered or moved:', event);
};

// Event  drag Column
const onColumnsReorder = (event: any) => {
  console.log('Columns reordered:', event);
};


//-Modal Task-//
const openTaskModal = ref(false);

// State สำหรับ Task ใหม่
const selectedColumnId = ref<number | ''>(''); // เก็บ id ของ Column ที่เลือก
const taskName = ref('');
const tags = ref<string[]>([]);
const members = ref<string[]>([]);

// ตัวแปรสำหรับเก็บ input ชั่วคราว ก่อนจะ add เข้า array
const tagInput = ref('');
const memberInput = ref('');

// เปิด/ปิด Modal
const closeTaskModal = () => {
  openTaskModal.value = false;
  // เคลียร์ฟอร์ม
  selectedColumnId.value = '';
  taskName.value = '';
  tags.value = [];
  members.value = [];
  tagInput.value = '';
  memberInput.value = '';
};

// เพิ่ม Tag
const addTag = () => {
  const newTag = tagInput.value.trim();
  if (newTag) {
    tags.value.push(newTag);
    tagInput.value = '';
  }
};

// เพิ่ม Member
const addMember = () => {
  const newMember = memberInput.value.trim();
  if (newMember) {
    members.value.push(newMember);
    memberInput.value = '';
  }
};

// Confirm สร้าง Task
const confirmAddTask = () => {
  // ตรวจสอบว่าเลือก column, ใส่ชื่อ task หรือยัง
  if (!selectedColumnId.value) {
    alert('Please select a column');
    return;
  }
  if (!taskName.value.trim()) {
    alert('Please enter a task name');
    return;
  }

  // หา Column ที่จะเพิ่ม Task
  const column = columns.value.find(col => col.id === selectedColumnId.value);
  if (!column) {
    alert('Column not found');
    return;
  }

  // สร้าง Task ใหม่
  const newTask: Task = {
    id: Date.now(),
    title: taskName.value,
    labels: tags.value,
    assignees: members.value
  };

  column.tasks.push(newTask);

  // ปิด modal และเคลียร์ค่าต่างๆ
  closeTaskModal();
};

// State ควบคุม modalAddColumn
const openModalAddCol = ref(false);
// State ก็บชื่อคอลัมน์ใหม่
const colName = ref('');
// State เก็บสีคอลัมน์ใหม่
const colColor = ref('#000000');

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
  background-color: #F60000;
  margin-left: 10px;
}
.member {
  display: inline-block;
  color: #333;
  border-radius: 3px;
  padding: 3px 6px;
  margin-right: 5px;
  font-size: 14px;
  margin-left: 10px;
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

/* Modal Column */
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

#Task .modal-overlay {
  position: fixed; /* ทำให้ Modal อยู่เหนือเนื้อหาอื่น */
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); 
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
  width: 400px;
  max-width: 90%;
  height: 800px;
  padding: 20px;
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
  color: #fff;
  border: 2px solid black;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
}
.member-input-area button {
  padding: 10px 15px;
  background-color: #007bff; /* สีฟ้า */
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 15px;
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
.member-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}
#Task .tag,
.member {
  background-color: #e9ecef; /* สีเทาอ่อน */
  color: #333;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 20px;
}
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
  padding: 10px 15px;
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

</style>
