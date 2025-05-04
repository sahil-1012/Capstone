'use client'

import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import { Users, UserPlus, Trash2, School, BookOpen } from 'lucide-react'
import { handleRegistration } from '@/server/actions/registration'

const PANELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const DOMAINS = [
  'Web', 'AI', 'Cloud', 'IoT', 'Cybersecurity', 'Blockchain', 'DevOps', 'AR/VR', 'Big Data',
  'Machine Learning', 'Deep Learning', 'Mobile Apps', 'Game Development', 'Quantum Computing',
  'Edge Computing', 'Data Science', 'Robotics', 'Embedded Systems', 'Digital Twins',
  'Natural Language Processing', 'Computer Vision', 'Bioinformatics', 'Neural Interfaces',
  'Smart Cities', 'Autonomous Vehicles', '3D Printing', 'AgriTech', 'FinTech', 'HealthTech',
  'EdTech', 'LegalTech', 'E-commerce', 'SaaS', 'PaaS', 'Drones', 'Green Tech', 'Wearables',
  'Speech Recognition', 'Smart Contracts', 'Digital Forensics', 'Animation', 'Cloud Gaming',
  'Human-Computer Interaction', 'No-Code', 'Low-Code', 'Microservices', 'CI/CD', 'Serverless',
  'Privacy Engineering', 'XR (Extended Reality)', 'Synthetic Media'
]

type Member = {
  studentId: string
  name: string
  panel: string
  roll: number
  domains: string[]
  officialEmailId: string
}

export type IRegistrationFormValues = {
  projects: Array<{ title: string, domain: string }>
  members: Array<Member>
}

export default function GroupRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const officialEmailId = searchParams.get('email');

  const form = useForm<IRegistrationFormValues>({
    defaultValues: {
      projects: [{ title: '', domain: '' }],
      members: [{
        studentId: '', name: '', panel: '', roll: 0, domains: [], officialEmailId: officialEmailId || ''
      }]
    }
  })

  const onSubmit = async (values: IRegistrationFormValues) => {
    const { success, message } = await handleRegistration(values)
    if (success) return router.push('/login')
    else alert(message)
  }

  const addMember = () => {
    const currentMembers = form.getValues('members')
    form.setValue('members', [
      ...currentMembers,
      { studentId: '', name: '', panel: '', roll: 0, domains: [], officialEmailId: '' },
    ])
  }

  const removeMember = (index: number) => {
    const currentMembers = form.getValues('members')
    if (currentMembers.length > 1)
      form.setValue('members', currentMembers.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-5 p-6 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="text-center space-y-2">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-primary/10 rounded-full">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Create Your Project Group
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Register your projects group and team members. Make sure to provide accurate information
          for all team members.
        </p>
      </div>

      <Card className="shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <School className="h-6 w-6" />
            Group Registration
          </CardTitle>
          <CardDescription>
            Fill in the details for your projects group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Project Details
                  </h3>
                  <Button
                    type="button"
                    onClick={() => {
                      const currentProjects = form.getValues('projects')
                      form.setValue('projects', [...currentProjects, { title: '', domain: '' }])
                    }}
                    className="flex items-center gap-2"
                  >
                    <UserPlus className="h-4 w-4" />
                    Add Project
                  </Button>
                </div>

                {form.watch('projects').map((_, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">Project {index + 1}</CardTitle>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            const current = form.getValues('projects')
                            form.setValue('projects', current.filter((_, i) => i !== index))
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name={`projects.${index}.title`}
                        rules={{ required: 'Project title is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Title*</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`projects.${index}.domain`}
                        rules={{ required: 'Domain is required' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Project Domain*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select domain" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {DOMAINS.map(domain => (
                                  <SelectItem key={domain} value={domain}>
                                    {domain}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>


              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Team Members
                  </h3>
                  <Button type="button" onClick={addMember} className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Add Member
                  </Button>
                </div>

                {form.watch('members').map((_, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-base font-medium">Member {index + 1}</CardTitle>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-3 gap-4">
                      <FormField
                        rules={{ required: 'Field label is required' }}
                        control={form.control}
                        name={`members.${index}.studentId`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student ID*</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />


                      <FormField
                        control={form.control}
                        name={`members.${index}.officialEmailId`}
                        rules={{ required: 'official Email Id is required for the first member' }}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Official Email Id*</FormLabel>
                            <FormControl>
                              <Input type="officialEmailId" {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />



                      <FormField
                        rules={{ required: 'Field label is required' }}
                        control={form.control}
                        name={`members.${index}.name`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name*</FormLabel>
                            <FormControl>
                              <Input {...field} className="h-12" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        rules={{ required: 'Field label is required' }}
                        control={form.control}
                        name={`members.${index}.panel`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Panel*</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Select panel" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {PANELS.map(panel => (
                                  <SelectItem key={panel} value={panel}>
                                    {panel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        rules={{ required: 'Field label is required' }}
                        control={form.control}
                        name={`members.${index}.roll`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roll Number*</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                {...field}
                                onChange={e => field.onChange(+e.target.value)}
                                className="h-12"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`members.${index}.domains`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <FormLabel>Domains*</FormLabel>
                            <div className="space-y-2">
                              <Select
                                onValueChange={value => field.onChange([...field.value, value])}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-12">
                                    <SelectValue placeholder="Add domain expertise" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {DOMAINS.map(domain => (
                                    <SelectItem key={domain} value={domain}>
                                      {domain}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <div className="flex flex-wrap gap-2">
                                {field.value.map((domain, i) => (
                                  <div
                                    key={i}
                                    className="bg-primary text-primary-foreground px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                                  >
                                    {domain}
                                    <button
                                      type="button"
                                      onClick={() =>
                                        field.onChange(
                                          field.value.filter((_, idx) => idx !== i)
                                        )
                                      }
                                      className="hover:bg-primary-foreground/20 rounded-full p-1"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Button type="submit" className="w-full h-12">
                Complete Registration
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
