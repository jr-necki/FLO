package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import com.example.flo.databinding.FragmentAlbumBinding

class AlbumFragment : Fragment(){
    lateinit var binding: FragmentAlbumBinding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        //fragment에서 binding 초기화
        binding = FragmentAlbumBinding.inflate(inflater, container,false)
        binding.albumArrowBackIb.setOnClickListener{
            (context as MainActivity).supportFragmentManager.beginTransaction()
                // mainActivity의 frame --> 바꿀 프레그먼트
                .replace(R.id.main_frm, HomeFragment())
                .commitAllowingStateLoss()
        }

        //activity에서 setContentView와 같음음
       return binding.root
    }
}