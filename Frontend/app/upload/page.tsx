"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/hooks/use-language"
import { PLATFORMS } from "@/lib/constants"
import { getTranslation } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { AlertTriangle, FileText, Loader2, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCallback, useState } from "react"

export default function UploadPage() {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [file, setFile] = useState<File | null>(null)
  const [text, setText] = useState("")
  const [platform, setPlatform] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const t = getTranslation(language)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile && (droppedFile.type === "image/jpeg" || droppedFile.type === "image/png")) {
      if (droppedFile.size <= 10 * 1024 * 1024) {
        setFile(droppedFile)
        setError(null)
      } else {
        setError("File size must be less than 10MB")
      }
    } else {
      setError("Please upload a JPG or PNG image")
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.size <= 10 * 1024 * 1024) {
        setFile(selectedFile)
        setError(null)
      } else {
        setError("File size must be less than 10MB")
      }
    }
  }

  const handleSubmit = async () => {
    if (!platform) {
      setError("Please select a platform")
      return
    }

    if (!file && !text.trim()) {
      setError("Please upload a screenshot or enter text content")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const formData = new FormData()
      if (file) formData.append("file", file)
      if (text) formData.append("text", text)
      formData.append("platform_id", platform)
      formData.append("language", language)
      formData.append("anonymous", "true")

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to analyze content")
      }

      const result = await response.json()
      router.push(`/results/${result.report_id}?lang=${language}`)
    } catch {
      setError("Failed to analyze content. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} onLanguageChange={setLanguage} />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground">{t.upload.title}</h1>
            <p className="mt-2 text-muted-foreground">{t.upload.subtitle}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Upload className="h-5 w-5" />
                {language === "am" ? "ማስረጃ ስቀል" : "Upload Evidence"}
              </CardTitle>
              <CardDescription>{t.upload.dropzoneHint}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* File Dropzone */}
              <div
                className={cn(
                  "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
                  isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50",
                  file && "border-success bg-success/5",
                )}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-input")?.click()}
              >
                <input
                  id="file-input"
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={handleFileInput}
                  className="hidden"
                />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <FileText className="h-10 w-10 text-success" />
                    <p className="font-medium text-foreground">{file.name}</p>
                    <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <p className="font-medium text-foreground">{t.upload.dropzone}</p>
                    <p className="text-sm text-muted-foreground">{t.upload.dropzoneHint}</p>
                  </div>
                )}
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">{t.upload.orText}</span>
                </div>
              </div>

              {/* Text Input */}
              <div>
                <Textarea
                  placeholder={t.upload.textPlaceholder}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
              </div>

              {/* Platform Select */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.upload.platform}</label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.upload.platformPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (
                      <SelectItem key={p.id} value={p.id}>
                        {p.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Warning */}
              <Alert variant="default" className="bg-warning/10 border-warning/30">
                <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                <AlertDescription className="text-warning-foreground">{t.upload.warning}</AlertDescription>
              </Alert>

              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || (!file && !text.trim())}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t.upload.submitting}
                  </>
                ) : (
                  t.upload.submit
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
