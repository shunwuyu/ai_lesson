"use client"
import { useState } from "react"

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async () => {
    const url = isLogin ? "/api/auth/login" : "/api/auth/register"
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    if (!res.ok) {
      setMessage(data.error || "操作失败")
      return
    }

    if (isLogin) {
      // 存储 token
      localStorage.setItem("accessToken", data.accessToken)
      localStorage.setItem("refreshToken", data.refreshToken)
      setMessage("登录成功！你现在可以访问 / 页面了")
    } else {
      setMessage("注册成功！请登录")
      setIsLogin(true)
    }
  }

  return (
    <main className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? "登录" : "注册"}</h1>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "登录" : "注册"}
        </button>
        <p className="text-sm text-gray-600">
          {isLogin ? "还没有账号？" : "已有账号？"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "去注册" : "去登录"}
          </span>
        </p>
        {message && <p className="text-center text-red-500">{message}</p>}
      </div>
    </main>
  )
}
