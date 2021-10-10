package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.flo.databinding.FragmentBackgroundsong2Binding

class Backgroundsong2Fragment : Fragment() {
    lateinit var binding: FragmentBackgroundsong2Binding

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding = FragmentBackgroundsong2Binding.inflate(inflater,container,false)
        return binding.root
    }


}