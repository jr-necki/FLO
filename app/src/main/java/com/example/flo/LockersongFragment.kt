package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.flo.databinding.FragmentBannerBinding
import com.example.flo.databinding.FragmentDetailBinding
import com.example.flo.databinding.FragmentLockersongBinding
import com.example.flo.databinding.FragmentSongBinding

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
            add(LockerSong("Savage","에스파 (AESPA)",R.drawable.img_album_exp))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))
            add(LockerSong("Peaches","Justin Bieber",R.drawable.img_album_exp))
            add(LockerSong("Wonderwall","Oasis",R.drawable.img_album_exp))
            add(LockerSong("Freedom","Kygo & ZakAbel",R.drawable.img_album_exp2))
            add(LockerSong("ABCD","PnB Rock",R.drawable.img_album_exp))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.img_album_exp))
            add(LockerSong("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
            add(LockerSong("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
            add(LockerSong("OTW","Khalid",R.drawable.img_album_exp2))
            add(LockerSong("Savage","에스파 (AESPA)",R.drawable.img_album_exp))
            add(LockerSong("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode))
            add(LockerSong("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
        }
        // 더미 데이터와 Adapter 연결
        val lockersongRVAdapter = LockerSongAdapter(songDatas)

        // 리사이클러뷰에 어댑터를 연결
        binding.lockerSongRv.adapter = lockersongRVAdapter

        return binding.root
    }


}