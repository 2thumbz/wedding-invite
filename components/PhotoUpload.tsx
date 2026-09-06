'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient'

const BUCKET = 'celebration-photos'
const UPLOADER_TOKEN_KEY = 'photo-uploader-token'

function getUploaderToken() {
  if (typeof window === 'undefined') return ''
  let token = localStorage.getItem(UPLOADER_TOKEN_KEY)
  if (!token) {
    token =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(UPLOADER_TOKEN_KEY, token)
  }
  return token
}

type PhotoEntry = {
  id: number
  file_path: string
  uploader_name: string | null
  uploader_token: string | null
  created_at: string
  url: string
}

export function PhotoUpload() {
  const [photos, setPhotos] = useState<PhotoEntry[]>([])
  const [uploaderName, setUploaderName] = useState('')
  const [uploading, setUploading] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selected, setSelected] = useState<PhotoEntry | null>(null)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [myToken, setMyToken] = useState('')

  useEffect(() => {
    setMyToken(getUploaderToken())
  }, [])

  const fetchPhotos = async () => {
    const { data, error } = await supabase
      .from('celebration_photos')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      const withUrls = data.map((row: any) => {
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(row.file_path)
        return { ...row, url: pub.publicUrl } as PhotoEntry
      })
      setPhotos(withUrls)
    }
  }

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchPhotos()
    }
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    try {
      const ext = file.name.split('.').pop() ?? 'jpg'
      const filePath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from(BUCKET)
        .upload(filePath, file, { cacheControl: '3600', upsert: false })

      if (uploadError) throw uploadError

      const { error: insertError } = await supabase.from('celebration_photos').insert({
        file_path: filePath,
        uploader_name: uploaderName.trim() || null,
        uploader_token: myToken || getUploaderToken(),
      })

      if (insertError) throw insertError

      await fetchPhotos()
    } catch (err) {
      setError('업로드에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (photo: PhotoEntry) => {
    if (deletingId) return
    setDeletingId(photo.id)
    setError(null)

    try {
      await supabase.storage.from(BUCKET).remove([photo.file_path])

      const { error: deleteError } = await supabase
        .from('celebration_photos')
        .delete()
        .eq('id', photo.id)
        .eq('uploader_token', photo.uploader_token ?? '')

      if (deleteError) throw deleteError

      setSelected(null)
      await fetchPhotos()
    } catch (err) {
      setError('삭제에 실패했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setDeletingId(null)
    }
  }


  return (
    <section className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <p className="text-xs tracking-[0.35em] text-slate-400 mb-3">CAPTURE OUR MOMENTS</p>
        <p className="text-sm text-slate-500">
          신랑신부의 행복한 순간을 담아주세요<br />
          예식 당일, 아래 버튼을 통해 사진을 올려주세요
        </p>
      </div>

      {!isSupabaseConfigured && (
        <p className="text-center text-xs text-amber-600 mb-6">
          사진 업로드 기능을 사용하려면 Supabase 환경변수 설정이 필요합니다.
        </p>
      )}

      <div className="space-y-3 mb-10">
        <input
          type="text"
          value={uploaderName}
          onChange={(e) => setUploaderName(e.target.value)}
          placeholder="이름 (선택)"
          maxLength={20}
          className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-sky-300"
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading || !isSupabaseConfigured}
          className="hidden"
          id="photo-upload-input"
        />
        <label
          htmlFor="photo-upload-input"
          className={`block w-full text-center text-xs tracking-wide rounded-full px-5 py-3 border transition-colors ${
            uploading || !isSupabaseConfigured
              ? 'opacity-40 cursor-not-allowed border-slate-200 text-slate-400'
              : 'text-sky-600 border-sky-200 hover:bg-sky-50 cursor-pointer'
          }`}
        >
          {uploading ? '업로드 중...' : '사진 업로드'}
        </label>

        {error && <p className="text-xs text-red-500 text-center">{error}</p>}
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <button
              key={photo.id}
              onClick={() => setSelected(photo)}
              className="relative aspect-square rounded-lg overflow-hidden border border-slate-100"
            >
              <Image src={photo.url} alt="" fill className="object-cover" sizes="150px" />
            </button>
          ))}
        </div>
      )}

      {photos.length === 0 && isSupabaseConfigured && (
        <p className="text-center text-sm text-slate-400 py-6">
          아직 업로드된 사진이 없습니다.
        </p>
      )}

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl text-gray-800 hover:bg-gray-200 transition-colors shadow-lg z-10"
          >
            ✕
          </button>
          {myToken && selected.uploader_token === myToken && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDelete(selected)
              }}
              disabled={deletingId === selected.id}
              className="absolute top-4 left-4 text-xs tracking-wide text-white bg-red-500/90 rounded-full px-4 py-2 hover:bg-red-600 transition-colors shadow-lg z-10 disabled:opacity-50"
            >
              {deletingId === selected.id ? '삭제 중...' : '내 사진 삭제'}
            </button>
          )}
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
              <Image src={selected.url} alt="" fill className="object-contain" sizes="100vw" />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

