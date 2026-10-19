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

const content: Record<
  Language,
  {
    title: string
    description: string
    confirm: string
    cancel: string
  }
> = {
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
  om: {
    title: "Akeekkachiisa Qabiyyee",
    description:
      "Qabiyyee miidhaa, qoccolloo ykn miidhaa qaamaa nama dhiphisu qabaachuu danda'u ilaaluuf jirtu. Qophii yoo taatan qofa itti fufaa.",
    confirm: "Hubadheera, itti fufi",
    cancel: "Duubatti deebi'i",
  },
  ti: {
    title: "መጠንቀቕታ ትሕዝቶ",
    description:
      "መግለጺታት መጥቃዕቲ፡ ምግልባጥ ወይ ዓመጽ ዘጠቓልል ዘጨንቕ ትሕዝቶ ንምርኣይ ትዳለዉ ኣለኹም። ድሉዋት እንተኾይንኩም ጥራይ ቅጸሉ:",
    confirm: "ተረዲኡኒ፡ ቅጸል",
    cancel: "ተመለስ",
  },
  so: {
    title: "Digniin Ku Saabsan Nuxurka",
    description:
      "Waxaad ku dhowdahay inaad aragto nuxur ay ku jiri karaan waxyaabo dhiillo leh oo ay ku jiraan xadgudub, dhibaateyn, ama rabshado. Fadlan sii wad kaliya haddii aad diyaar u tahay.",
    confirm: "Waan fahmay, sii wad",
    cancel: "Dib u noqo",
  },
}

export function ContentWarningModal({ open, onConfirm, onCancel, language = "en" }: ContentWarningModalProps) {
  const t = content[language] || content.en

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
