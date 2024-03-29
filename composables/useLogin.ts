// ユーザーのログイン状態管理、基本データ管理を行う
import useApiClient from '~/composables/useApiClient'
import { useAuthStore, User } from '~/stores/auth'

export const useLogin = () => {
  const authStore = useAuthStore()
  const authWithCode = async (code: string): Promise<boolean> => {
    try {
      const token: any = await $fetch(
        'http://localhost:1306/api/v1/auth/token',
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          method: 'POST',
          body: JSON.stringify({ code })
        }
      )
      if (!token.token) {
        return false
      }
      const authStore = useAuthStore()
      authStore.setToken(token.token)
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }

  const trySignIn = async () => {
    const client = useApiClient()
    try {
      const resp = await client.get('/api/v1/user/info')
      if (resp.error) {
        return false
      }
      const user = resp.data as User
      authStore.setUser(user)
    } catch (e) {
      console.error(e)
      return false
    }
    return true
  }
  const getCurrentUser = async (): Promise<User | null> => {
    if (authStore.getUser) {
      console.log('authStore.getUser is exist', authStore.getUser)
      return authStore.getUser
    }
    if (authStore.getToken) {
      console.log('authStore.getUser is not exist', authStore.getUser)
      await trySignIn()
      console.log('after trySignin', authStore.getUser)
      return authStore.getUser
    }
    return null
  }
  const signOut = (): void => {
    authStore.clearToken()
    authStore.clearUser()
  }
  return { getCurrentUser, signOut, trySignIn, authWithCode }
}
