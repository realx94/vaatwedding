import React, { useEffect, useMemo, useState, useRef, useImperativeHandle } from 'react'

function SectionCard({ title, children, actions }) {
  return (
    <section className="section py-10">
      <div className="card p-6">
        <div className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 -mx-6 -mt-6 px-6 py-4 rounded-t-2xl border-b border-white/40 shadow-xl flex items-center justify-between">
          <h2 className="heading">{title}</h2>
          {actions}
        </div>
        <div className="mt-4 h-[80vh] flex flex-col">{children}</div>
      </div>
    </section>
  )
}

const RSVPGrid = React.forwardRef(function RSVPGrid(_props, ref) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ name: '', count: '', status: '', guestOf: '', bus: '', note: '' })
  useEffect(() => {
    load()
  }, [])
  const load = () => {
    setLoading(true)
    fetch(`/api/get-rsvp?ts=${Date.now()}`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setRows(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useImperativeHandle(ref, () => ({ reload: load, loading }), [loading])
  const filtered = useMemo(() => {
    const name = filters.name.trim().toLowerCase()
    const count = filters.count.trim().toLowerCase()
    const status = filters.status.trim().toLowerCase()
    const guestOf = filters.guestOf.trim().toLowerCase()
    const bus = filters.bus.trim().toLowerCase()
    const note = filters.note.trim().toLowerCase()
    return rows.filter(r => {
      const n0 = (r.name || '').toLowerCase().includes(name)
      const c0 = count ? String(r.count || '').toLowerCase().includes(count) : true
      const s0 = status ? String(r.status || '').toLowerCase().includes(status) : true
      const g0 = guestOf ? String(r.guestOf || '').toLowerCase().includes(guestOf) : true
      const b0 = bus ? ((bus === 'true' && !!r.bus) || (bus === 'false' && !r.bus)) : true
      const no0 = note ? String(r.note || '').toLowerCase().includes(note) : true
      return n0 && c0 && s0 && g0 && b0 && no0
    })
  }, [rows, filters])
  const setF = (k, v) => setFilters(x => ({ ...x, [k]: v }))
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 shrink-0">
        <input className="form-input w-full" placeholder="Tên" value={filters.name} onChange={e => setF('name', e.target.value)} />
        <input className="form-input w-full" placeholder="Số lượng" value={filters.count} onChange={e => setF('count', e.target.value)} />
        <select className="form-input w-full" value={filters.status} onChange={e => setF('status', e.target.value)}>
          <option value="">Trạng thái</option>
          <option value="yes">Tham dự</option>
          <option value="no">Không tham dự</option>
        </select>
        <select className="form-input w-full" value={filters.guestOf} onChange={e => setF('guestOf', e.target.value)}>
          <option value="">Khách của</option>
          <option value="groom">Chú Rể</option>
          <option value="bride">Cô Dâu</option>
          <option value="both">Chú Rể và Cô Dâu</option>
        </select>
        <select className="form-input w-full" value={filters.bus} onChange={e => setF('bus', e.target.value)}>
          <option value="">Đi xe</option>
          <option value="true">Có</option>
          <option value="false">Không</option>
        </select>
        <input className="form-input w-full" placeholder="Ghi chú" value={filters.note} onChange={e => setF('note', e.target.value)} />
      </div>
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[900px] h-full overflow-y-auto rounded-xl border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl">
          <div className="grid grid-cols-7 gap-2 px-4 py-3 bg-gradient-to-r from-green-100 via-green-200 to-green-300 border-b border-white/40">
            <div className="font-semibold text-primary-700">Tên</div>
            <div className="font-semibold text-primary-700">Số lượng</div>
            <div className="font-semibold text-primary-700">Trạng thái</div>
            <div className="font-semibold text-primary-700">Khách của</div>
            <div className="font-semibold text-primary-700">Đi xe</div>
            <div className="font-semibold text-primary-700">Ghi chú</div>
            <div className="font-semibold text-primary-700">Thời gian</div>
          </div>
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-700">Đang tải...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-700">Không có dữ liệu</div>
          )}
          {!loading && filtered.map((r, i) => {
            const dt = new Date(r.ts || Date.now())
            const time = dt.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
            return (
              <div key={i} className="grid grid-cols-7 gap-2 px-4 py-3 border-t border-white/20 hover:bg-white/20">
                <div className="truncate">{r.name}</div>
                <div>{r.count}</div>
                <div>{r.status === 'yes' ? 'Tham dự' : r.status === 'no' ? 'Không tham dự' : ''}</div>
                <div>{r.guestOf === 'groom' ? 'Chú Rể' : r.guestOf === 'bride' ? 'Cô Dâu' : 'Chú Rể và Cô Dâu'}</div>
                <div>{r.bus ? 'Có' : 'Không'}</div>
                <div className="truncate">{r.note}</div>
                <div className="text-sm text-gray-600">{time}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})

const WishesGrid = React.forwardRef(function WishesGrid(_props, ref) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({ name: '', message: '' })
  useEffect(() => {
    load()
  }, [])
  const load = () => {
    setLoading(true)
    fetch(`/api/get-wishes?ts=${Date.now()}`)
      .then(r => r.ok ? r.json() : [])
      .then(d => { if (Array.isArray(d)) setRows(d) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }
  useImperativeHandle(ref, () => ({ reload: load, loading }), [loading])
  const filtered = useMemo(() => {
    const name = filters.name.trim().toLowerCase()
    const message = filters.message.trim().toLowerCase()
    return rows.filter(r => {
      const n0 = (r.name || '').toLowerCase().includes(name)
      const m0 = (r.message || '').toLowerCase().includes(message)
      return n0 && m0
    })
  }, [rows, filters])
  const setF = (k, v) => setFilters(x => ({ ...x, [k]: v }))
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 shrink-0">
        <input className="form-input w-full" placeholder="Tên" value={filters.name} onChange={e => setF('name', e.target.value)} />
        <input className="form-input w-full" placeholder="Lời chúc" value={filters.message} onChange={e => setF('message', e.target.value)} />
      </div>
      <div className="overflow-x-auto flex-1">
        <div className="min-w-[600px] h-full overflow-y-auto rounded-xl border border-white/30 shadow-2xl bg-white/20 backdrop-blur-xl">
          <div className="grid grid-cols-3 gap-2 px-4 py-3 bg-gradient-to-r from-green-100 via-green-200 to-green-300 border-b border-white/40">
            <div className="font-semibold text-primary-700">Tên</div>
            <div className="font-semibold text-primary-700">Lời chúc</div>
            <div className="font-semibold text-primary-700">Thời gian</div>
          </div>
          {loading && (
            <div className="px-4 py-3 text-sm text-gray-700">Đang tải...</div>
          )}
          {!loading && filtered.length === 0 && (
            <div className="px-4 py-3 text-sm text-gray-700">Không có dữ liệu</div>
          )}
          {!loading && filtered.map((r, i) => {
            const dt = new Date(r.ts || Date.now())
            const time = dt.toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })
            return (
              <div key={i} className="grid grid-cols-3 gap-2 px-4 py-3 border-t border-white/20 hover:bg-white/20">
                <div className="truncate">{r.name}</div>
                <div className="truncate">{r.message}</div>
                <div className="text-sm text-gray-600">{time}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})

export default function Admin() {
  const [ok, setOk] = useState(false)
  const [pwd, setPwd] = useState('')
  const check = () => { if (pwd === '17012026') { setOk(true); try { sessionStorage.setItem('vaatwedding_admin_pwd', pwd) } catch {} } }
  useEffect(() => {
    try {
      const pre = sessionStorage.getItem('vaatwedding_admin_pwd')
      if (pre === '17012026') setOk(true)
    } catch {}
  }, [])
  const rsvpRef = useRef(null)
  const wishRef = useRef(null)
  if (!ok) {
    return (
      <div className="section">
        <div className="max-w-md mx-auto card p-6 mt-10">
          <div className="bg-gradient-to-r from-green-200 via-green-300 to-green-400 -mx-6 -mt-6 px-6 py-4 rounded-t-2xl border-b border-white/40 shadow-xl">
            <h2 className="heading">Admin</h2>
          </div>
          <form className="mt-4 space-y-3" onSubmit={(e) => { e.preventDefault(); check() }}>
            <input className="form-input w-full" type="password" placeholder="Nhập mật khẩu" value={pwd} onChange={e => setPwd(e.target.value)} />
            <button type="submit" className="btn-gradient px-4 py-2 rounded-md w-full">Đăng nhập</button>
          </form>
        </div>
      </div>
    )
  }
  return (
    <div>
      <SectionCard title="Danh sách xác nhận tham dự" actions={<AdminRefreshBtn refObj={rsvpRef} />}>
        <RSVPGrid ref={rsvpRef} />
      </SectionCard>
      <SectionCard title="Lời chúc" actions={<AdminRefreshBtn refObj={wishRef} />}>
        <WishesGrid ref={wishRef} />
      </SectionCard>
    </div>
  )
}

function AdminRefreshBtn({ refObj }) {
  const loading = !!refObj.current?.loading
  const onClick = () => { refObj.current?.reload?.() }
  return (
    <button className={`btn-gradient px-3 py-2 rounded-md ${loading ? 'opacity-60 cursor-not-allowed' : ''}`} disabled={loading} onClick={onClick}>Làm mới dữ liệu</button>
  )
}