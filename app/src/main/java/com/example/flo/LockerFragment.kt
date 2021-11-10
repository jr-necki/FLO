package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.example.flo.databinding.FragmentLockerBinding
import com.google.android.material.tabs.TabLayoutMediator


class LockerFragment : Fragment() {

    lateinit var binding: FragmentLockerBinding
    val infomation = arrayListOf("저장한 곡","음악파일")


    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        // binding 초기화
        binding = FragmentLockerBinding.inflate(inflater, container, false)




        // ViewPager와 Adapter를 연결
        val lockerAdapter = LockerViewPageAdapter(this)
        binding.lockerContentVp.adapter = lockerAdapter
        TabLayoutMediator(binding.lockerTb,binding.lockerContentVp){
            tab, position ->
            tab.text = infomation[position]
        }.attach()

        return binding.root
    }


}