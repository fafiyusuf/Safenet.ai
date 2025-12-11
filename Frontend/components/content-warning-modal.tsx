"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Language } from "@/lib/i18n"

interface ContentWarningModalProps {
  open: boolean
  onConfirm: () => void
  onCancel: () => void
  language?: Language
}

const content = {
  en: {
    title: "Content Warning",
    description:
      "You are about to view content that may contain disturbing or triggering material including descriptions of abuse, harassment, or violence. Please proceed only if you feel ready.",
    confirm: "I understand, continue",
    cancel: "Go back",
  },
  am: {
    title: "የይዘት ማስጠንቀቂያ",
    description:
      "የጥቃት፣ ትንኮሳ ወይም ጥቃት መግለጫዎችን ጨምሮ አስቸጋሪ ወይም አስጨናቂ ቁሳቁስ ሊያካትት የሚችል ይዘት ለማየት እየተዘጋጁ ነው። እባክዎ ዝግጁ ከሆኑ ብቻ ይቀጥሉ።",
    confirm: "ተረድቻለሁ፣ ቀጥል",
    cancel: "ተመለስ",
  },
}

export function ContentWarningModal({ open, onConfirm, onCancel, language = "en" }: ContentWarningModalProps) {
  const t = content[language]

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t.title}</AlertDialogTitle>
          <AlertDialogDescription>{t.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>{t.cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{t.confirm}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
