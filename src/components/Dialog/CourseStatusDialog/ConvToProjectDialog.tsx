'use client'
import { updateMultipleProjects } from '@/actions/project'
import { ListProjectStatus } from '@/actions/projectStatus'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'
import { useActionState, useState } from 'react'

type Props = {
  children: React.ReactNode
  newCourseStatus: number
  ids: number[]
  onSuccess?: () => void
  nullOnSuccess?: boolean
}

export function ConvToProjectDialog({
  children,
  newCourseStatus,
  ids = [],
  onSuccess,
  nullOnSuccess,
}: Props) {
  const [open, setOpen] = useState(false)

  const [error, action, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        await updateMultipleProjects(null, formData)
        setOpen(false)
        if (onSuccess) onSuccess()
      } catch (err) {
        return 'เกิดข้อผิดพลาดในการสร้างโครงงาน'
      }
    },
    undefined,
  )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-dvw bg-white">
        <DialogHeader>
          <DialogTitle>อัปเดตสถานะดำเนินการ</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="ids" value={JSON.stringify(ids)} />
          <input type="hidden" name="courseStatus" value={newCourseStatus} />

          {nullOnSuccess && (
            <input type="hidden" name="projectStatusId" value={'null'} />
          )}

          <div className="w-full max-w-screen-md px-2">
            อัปเดตสถานะดำเนิการเป็น
            <span className="font-semibold">
              &ldquo;{CourseStatusDesc(newCourseStatus)}&rdquo;
            </span>
          </div>

          <div className="space-y-2">
            <label htmlFor="projectSemester" className="block">
              ภาคการศึกษา
            </label>
            <input
              type="value"
              name="projectSemester"
              id="projectSemester"
              required
              defaultValue={1}
              min={1}
              max={2}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="projectAcademicYear" className="block">
              ปีการศึกษา
            </label>
            <input
              type="value"
              name="projectAcademicYear"
              id="projectAcademicYear"
              required
              defaultValue={new Date().getFullYear() + 543}
              className="w-full rounded-md border border-gray-300 p-2"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="primary-hover rounded-md border border-gray-300 px-4 py-2 text-gray-700"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary2-400 px-4 py-2 text-secondary1 transition-colors duration-200 hover:bg-primary2-500"
            >
              {isPending ? 'อัปเดต...' : 'อัปเดต'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
