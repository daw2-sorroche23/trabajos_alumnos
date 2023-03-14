
// Cargamos la libreria de supabase
import { createClient } from '@supabase/supabase-js'
export const pruebas = {
  template: '<h1>Pruebas</h1>',
  script: async () => {
    /// Conecxion con supabase
    const supabaseUrl = 'https://mriygusapxxtptlnntqq.supabase.co'

    // const supabaseKey = process.env.SUPABASE_KEY
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yaXlndXNhcHh4dHB0bG5udHFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcxNzY2MzMsImV4cCI6MTk5Mjc1MjYzM30.t0tEtIBPuf7ufhCknez5IEDaGA985pCIZqqzYpLFVUc'
    const supabase = createClient(supabaseUrl, supabaseKey)
    console.log('conecxion a supabase: ' + supabase)

    const leerTodosPerfiles = async () => {
      // Leer todas las lineas
      const { data: perfiles, error } = await supabase
        .from('perfiles')
        .select('*')

      console.log(perfiles)
      return perfiles
    }

    const agregarPerfil = async () => {
      /// Insertar nuevo perfil
      const { data, error } = await supabase
        .from('perfiles')
        .insert([
          { nombre: 'Paco' }
        ])
    }

    // Proyectos detalles
    const leerProyectosDetalles = async () => {
      // INVOKE FUNCTION
      const { data, error } = await supabase
        .rpc('proyectosdetalle')

      if (error) console.error(error)
      else console.log('proyectos con detalle', data)
      return data
    }

    const registro = async () => {
      // USER SIGNUP
      const { data, error } = await supabase.auth.signUp({
        email: 'zeus.sorroche@gmail.com',
        password: '123456'
      })
    }

    await registro()

    const login = async () => {
      // USER LOGIN
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'zeus.sorroche@gmail.com',
        password: '123456'
      })
    }

    const verUsuarioLogueado = async () => {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      return user
    }

    const logout = async () => {
      // USER LOGOUT
      const { error } = await supabase.auth.signOut()
    }

    // 1. miramos usuario logeado
    console.log('Detalle usuario logeado:', await verUsuarioLogueado())

    // 2.Me logueo
    await login()

    // 3. miramos usuario logeado
    console.log('Detalle usuario logeado:', await verUsuarioLogueado())

    // await logout()
  }
}
