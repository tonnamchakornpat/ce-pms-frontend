'use client'
import { GetProjectFormToken, UpdateProjectFormToken } from '@/actions/project'
import useSWR from 'swr'
import React, { useActionState, useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { Loader } from '@/components/Loading'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import {
  ProjectByIDRes,
  ProjectStudentRequest,
  StudentEntry,
} from '@/models/Project'
import {
  AddCircleRounded,
  IndeterminateCheckBoxRounded,
} from '@mui/icons-material'

export default function DocsEdit() {
  const [projectData, setProjectData] = useState<ProjectByIDRes | null>()

  const removeStudent = (index: number) => {
    if (!projectData?.students) return
    if (projectData.students.length === 1) return
    const newStudents = [...projectData.students]
    newStudents.splice(index, 1)
    setProjectData({
      ...projectData,
      students: newStudents,
    })
  }

  const [error, action, isPending] = useActionState(
    (prevState: unknown, formData: FormData) => {
      UpdateProjectFormToken(prevState, formData)
      redirect('/project')
    },
    null,
  )

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await GetProjectFormToken()
        setProjectData(data)
      } catch (error) {
        redirect('/project')
      }
    }
    fetch()
  }, [])

  if (!projectData) {
    return (
      <div className="mx-auto h-full w-full">
        <Loader />
      </div>
    )
  }

  return (
    <section className="relative mt-0 min-h-[90dvh] overflow-x-auto rounded bg-white p-10 shadow-md">
      <Link
        href="/project"
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        ย้อนกลับ
      </Link>
      <form className="container mx-auto max-w-3xl" action={action}>
        <input type="hidden" name="id" value={projectData.id || ''} />
        <h1 className="mb-6 text-center text-xl md:text-3xl">
          <input
            type="text"
            name="projectName"
            defaultValue={projectData.projectName || ''}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
            placeholder="ชื่อโครงงาน"
          />
        </h1>
        <h2 className="mb-8 text-center text-lg text-gray-500 md:text-2xl">
          <input
            type="text"
            name="projectNameEng"
            defaultValue={projectData.projectNameEng || ''}
            className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
            placeholder="ชื่อโครงงานภาษาอังกฤษ"
          />
        </h2>
        <div className="w-full">
          <div className="mb-8 border-b border-gray-300"></div>
          <div className="flex w-full flex-col gap-6 text-sm md:text-base">
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">ปีการศึกษา</h3>
              <div className="mt-2 flex gap-4">
                <input
                  type="text"
                  name="semester"
                  defaultValue={projectData.semester || ''}
                  className="w-1/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  placeholder="ภาคการศึกษา"
                />
                <span className="text-gray-500">/</span>
                <input
                  type="text"
                  name="academicYear"
                  defaultValue={projectData.academicYear || ''}
                  className="w-2/3 rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  placeholder="ปีการศึกษา"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">ประเภทโครงงาน</h3>
              <div className="mt-2 flex gap-4">
                <input
                  type="text"
                  name="type"
                  defaultValue={projectData.type || ''}
                  className="w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  placeholder="ระบุประเภทโครงงาน"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">บทคัดย่อ</h3>
              <textarea
                name="abstract"
                defaultValue={projectData.abstract || ''}
                className="textarea w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="กรอกบทคัดย่อ"
                rows={4}
              />
              <h3 className="mb-2 mt-6 font-bold">Abstract</h3>
              <textarea
                name="abstractEng"
                defaultValue={projectData.abstractEng || ''}
                className="textarea w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="Enter abstract in English"
                rows={4}
              />
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">รายละเอียด</h3>
              <textarea
                name="detail"
                defaultValue={projectData.abstract || ''}
                className="textarea w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="กรอกบทคัดย่อ"
                rows={4}
              />
              <h3 className="mb-2 mt-6 font-bold">Detail</h3>
              <textarea
                name="detailEng"
                defaultValue={projectData.abstractEng || ''}
                className="textarea w-full resize-none rounded-md border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="Enter abstract in English"
                rows={4}
              />
            </div>
            <div className="flex flex-col">
              <div className="mb-3 flex flex-row items-center justify-start">
                <h3 className="font-bold">ผู้พัฒนา</h3>{' '}
                {projectData.students.length < 3 && (
                  <button
                    type="button"
                    onClick={() => {
                      setProjectData({
                        ...projectData,
                        students: [
                          ...projectData.students,
                          {
                            student: {
                              studentId: '',
                              name: '',
                            },
                          } as StudentEntry,
                        ],
                      })
                    }}
                    className="ml-2 rounded-md p-1 text-primary2-400 transition-all duration-200 hover:text-primary2-500"
                  >
                    <AddCircleRounded />
                  </button>
                )}
              </div>

              {projectData.students?.map((item: any, i) => (
                <div key={item.student.studentId} className="mb-2 flex space-x-2">
                  <input
                    type="text"
                    name={`students[${i}].studentId`}
                    placeholder="รหัสนักศึกษา"
                    className="w-[100%] rounded-md border px-3 py-2"
                    required
                    defaultValue={item.student.studentId}
                  />
                  <input
                    type="text"
                    name={`students[${i}].name`}
                    placeholder="ชื่อ นามสกุล"
                    className="w-[100%] rounded-md border px-3 py-2"
                    defaultValue={item.student.name}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeStudent(i)}
                    className="rounded-md px-2 text-red-300 transition-all duration-200 hover:text-red-500"
                  >
                    <IndeterminateCheckBoxRounded />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className={`hover:bg-primary2-600 mt-8 w-full rounded-md bg-primary2-500 px-6 py-3 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary2-500 focus:ring-offset-2 ${
            isPending ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isPending}
        >
          {isPending ? 'กำลังบันทึกข้อมูล...' : 'บันทึกข้อมูล'}
        </button>
      </form>
    </section>
  )
}
