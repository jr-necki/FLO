package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.flo.databinding.FragmentLockersongBinding

class LockersongFragment : Fragment() {
    lateinit var binding: FragmentLockersongBinding
    private var songDatas=ArrayList<LockerSong>();

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentLockersongBinding.inflate(inflater,container,false)

        // 데이터 리스트 생성 더미데이터
        songDatas.apply {
            add(LockerSong("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
            add(LockerSong("Lilac","아이유 (IU)",R.drawable.img_album_exp2))
            add(LockerSong("Savage","에스파 (AESPA)",R.drawable.album_cover_savage))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))
            add(LockerSong("Peaches","Justin Bieber",R.drawable.album_cover_peaches))
            add(LockerSong("Wonderwall","Oasis",R.drawable.album_cover_glory))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))
            add(LockerSong("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
            add(LockerSong("Lilac","아이유 (IU)",R.drawable.img_album_exp2))
            add(LockerSong("Savage","에스파 (AESPA)",R.drawable.album_cover_savage))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))
            add(LockerSong("Peaches","Justin Bieber",R.drawable.album_cover_peaches))
            add(LockerSong("Wonderwall","Oasis",R.drawable.album_cover_glory))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))

        }
        // 더미 데이터와 Adapter 연결
        val lockersongRVAdapter = LockerSongRVAdapter(songDatas)

        // 리사이클러뷰에 어댑터를 연결
        binding.lockerSongRv.adapter = lockersongRVAdapter

        lockersongRVAdapter.setMyItemClickListener(object : LockerSongRVAdapter.MyItemClickListener{
            override fun onItemClick(song: LockerSong) {
                TODO("Not yet implemented")
            }

            override fun onRemoveSong(position: Int) {
                lockersongRVAdapter.removerItem(position)
            }
        })

        return binding.root
    }


}