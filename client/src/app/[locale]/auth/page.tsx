
import AuthComponent from "@/pagesComponents/AuthComponents/page";

export default function Login() {
  // const [isLogin, setIsLogin] = useState(true);

  // const handleToggle = (state: boolean) => {
  //   setIsLogin(state);
  // };

  return (
    <AuthComponent/>
    // <div>
    //   {isLogin ? <HeadLogin setIsLogin={setIsLogin} /> : <HeadRegister setIsLogin={setIsLogin} />}
    //   <BottomLogin isLogin={isLogin} onToggle={handleToggle} />
    // </div>
  );
}

