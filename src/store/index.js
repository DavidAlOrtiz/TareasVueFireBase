import { createStore } from 'vuex'
import router from '@/router'
export default createStore({
  state: {
    tareas : [],
    objForm:{
      id:'',
      nombre : '',
      categorias : [],
      estado : '',
      numero: 0
    }
  },
  getters: {
  },
  mutations: {
    set(stage, payLoad){
      stage.tareas.push(payLoad)
      //console.log(stage.tareas)
      localStorage.setItem('tareas', JSON.stringify(stage.tareas))
    },
    eliminar(stage, payLoad){
      stage.tareas = stage.tareas.filter(item => item.id !== payLoad)
      localStorage.setItem('tareas', JSON.stringify(stage.tareas))
    },
    tarea(stage, payLoad){
      if(!stage.tareas.find(item => item.id === payLoad)){
        router.push('/');
        return
      }
      stage.objForm = stage.tareas.find(item => item.id === payLoad)
      
    },
    update(stage, payload){
      stage.tareas = stage.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
      localStorage.setItem('tareas', JSON.stringify(stage.tareas))
    },
    cargar(stage, payload){
      stage.tareas = payload;
    }
  },
  actions: {
    cargarLocalStorage({commit}){
      if(localStorage.getItem('tareas')){
        const tareas = JSON.parse(localStorage.getItem('tareas'));
        commit('cargar', tareas );
        return
      }
      localStorage.setItem('tareas', JSON.stringify([]))

    },
    setTarea({commit}, objForm){
      commit('set', objForm)

    },
    deleteTareas({commit}, id){
      commit('eliminar', id)
    },
    setTareaEditar({commit}, id){
      commit('tarea', id)
    },
    updateTarea({commit}, tarea){
      commit('update', tarea)
    }
  },
  modules: {
  }
})
