const Auth = {
    loggedIn: function (): boolean {
      return !!localStorage.getItem("id_token");
    },
  
    getToken: function (): string | null {
      return localStorage.getItem("id_token");
    },
  
    login: function (token: string): void {
      localStorage.setItem("id_token", token);
      window.location.assign("/");
    },
  
    logout: function (): void {
      localStorage.removeItem("id_token");
      window.location.assign("/");
    }
  };
  
  export default Auth;
  