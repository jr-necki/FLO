package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.viewpager2.widget.ViewPager2
import com.example.flo.databinding.FragmentHomeBinding
import com.google.android.material.tabs.TabLayoutMediator


class HomeFragment : Fragment() {
    lateinit var binding: FragmentHomeBinding
    val infomation = arrayListOf("","","")
    private var albumDatas=ArrayList<Album>();

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        binding = FragmentHomeBinding.inflate(inflater, container, false)

//        binding.homeCover1.setOnClickListener{
//            (context as MainActivity).supportFragmentManager.beginTransaction()
//                    // mainActivity의 frame --> 바꿀 프레그먼트
//                .replace(R.id.main_frm, AlbumFragment())
//                .commitAllowingStateLoss()
//        }
        // 데이터 리스트 생성 더미 데이터
        albumDatas.apply {
            add(Album("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
            add(Album("Lilac","아이유 (IU)",R.drawable.img_album_exp2))
            add(Album("Savage","에스파 (AESPA)",R.drawable.img_album_exp))
            add(Album("SICKO MODE","Travis Scott",R.drawable.img_album_exp))
            add(Album("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp))
        }


        val bannerAdapter = BannerViewPagerAdapter(this)
        bannerAdapter.addFragment(BannerFragment(R.drawable.img_home_viewpager_exp))
        bannerAdapter.addFragment(BannerFragment(R.drawable.img_home_viewpager_exp2))
        bannerAdapter.addFragment(BannerFragment(R.drawable.img_home_viewpager_exp))

        binding.homeBannerVp.adapter = bannerAdapter
        binding.homeBannerVp.orientation = ViewPager2.ORIENTATION_HORIZONTAL

        val homeAdapter = HomeViewPagerAdapter(this)
        binding.homeContentVp.adapter = homeAdapter
        TabLayoutMediator(binding.homeTb, binding.homeContentVp){
            tab,position ->
            tab.text = infomation[position]
        }.attach()
        return binding.root
    }


}