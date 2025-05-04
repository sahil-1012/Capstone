'use client'

import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card, CardContent, CardHeader,
  CardTitle, CardDescription, CardFooter
} from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { loginAction } from '@/server/actions/loginAction'

export default function LoginPage() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    startTransition(async () => {
      const { success, type, message } = await loginAction(userId, password);
      if (success) router.push(`${type}/dashboard`);
      else alert(message ?? 'Invalid credentials');
    })
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Welcome back</h1>
          <p className="text-gray-600">Sign in to your student project portal</p>
        </div>

        <Card className="w-full shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>Enter your student ID and password to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Student ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>

                <div className="relative">
                  <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-12 pr-10" required />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5" tabIndex={-1} aria-label={showPassword ? 'Hide password' : 'Show password'}                    >
                    {showPassword
                      ? <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-700" />
                      : <Eye className="h-5 w-5 text-gray-400 hover:text-gray-700" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Link href="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isPending}>
                {isPending ? 'Signing in...' : 'Sign in'}
                {!isPending && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-2 text-muted-foreground">
                  New to the portal?
                </span>
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => router.push('/signup')}>
              Create an account
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}