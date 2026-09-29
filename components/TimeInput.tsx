'use client'
/* Servis saati girişi. Boş bırakılamıyor: tarayıcının saat alanı
   temizlenince boş değer yolluyor, o durumda son geçerli saat kalıyor. */
export default function TimeInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="time-field" htmlFor={id}>
      <span className="docket">{label}</span>
      <input
        id={id}
        type="time"
        value={value}
        required
        onChange={(e) => { if (e.target.value) onChange(e.target.value) }}
      />
    </label>
  )
}
