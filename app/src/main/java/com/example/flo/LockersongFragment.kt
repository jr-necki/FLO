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

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentLockersongBinding.inflate(inflater,container,false)
        return binding.root
    }


}