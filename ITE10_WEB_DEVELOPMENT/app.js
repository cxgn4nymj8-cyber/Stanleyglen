// LocalStorage key for demo users
const USERS_KEY = 'sgb_users';
// Read users from localStorage (returns an object map)
function getUsers(){
  const raw = localStorage.getItem(USERS_KEY);
  try{ return raw ? JSON.parse(raw) : {}; }catch(e){ return {}; }
}
// Persist users back to localStorage
function setUsers(u){ localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
// Toggle visible form and active tab
function showForm(id){
  document.querySelectorAll('.form').forEach(f=>f.classList.remove('active'));
  const el = document.getElementById(id);
  if(el) el.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(b=>{
    b.classList.toggle('active', b.dataset.target===id);
  });
}
function initAuth(){
  document.querySelectorAll('.tab-btn').forEach(b=>{
    b.addEventListener('click',()=>showForm(b.dataset.target));
  });
  const signupForm = document.getElementById('signup');
  if(signupForm){
    signupForm.addEventListener('submit',e=>{
      e.preventDefault();
      const username = document.getElementById('signup-username')?.value.trim();
      const password = document.getElementById('signup-password')?.value;
      if(!username || !password){ alert('Enter a username and password'); return; }
      if(password.length < 4){ alert('Password must be at least 4 characters'); return; }
      const users = getUsers();
      if(users[username]){ alert('Username already exists'); return; }
      users[username] = { password };
      setUsers(users);
      localStorage.setItem('sgb_current', username);
      window.location.href = 'portfolio.html';
    });
  }
  const loginForm = document.getElementById('login');
  if(loginForm){
    loginForm.addEventListener('submit',e=>{
      e.preventDefault();
      const username = document.getElementById('login-username')?.value.trim();
      const password = document.getElementById('login-password')?.value;
      if(!username || !password){ alert('Enter your username and password'); return; }
      const users = getUsers();
      const u = users[username];
      if(!u || u.password!==password){ alert('Invalid credentials'); return; }
      localStorage.setItem('sgb_current', username);
      window.location.href = 'portfolio.html';
    });
  }
  const forgotForm = document.getElementById('forgot');
  if(forgotForm){
    forgotForm.addEventListener('submit',e=>{
      e.preventDefault();
      const username = document.getElementById('forgot-username')?.value.trim();
      const newPass = document.getElementById('forgot-password')?.value;
      if(!username || !newPass){ alert('Enter username and new password'); return; }
      if(newPass.length < 4){ alert('New password must be at least 4 characters'); return; }
      const users = getUsers();
      if(!users[username]){ alert('User not found'); return; }
      users[username].password = newPass;
      setUsers(users);
      alert('Password reset');
      showForm('login');
    });
  }
}

if(document.readyState === 'loading'){
  window.addEventListener('DOMContentLoaded', initAuth);
}else{
  initAuth();
}
