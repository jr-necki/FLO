package com.example.flo

import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter

class BannerViewPagerAdapter (fragment : Fragment) : FragmentStateAdapter(fragment){
// adapter는 인자가 필요하다 fragment를 넣어야하니까
// FragementStateAdapter를 상속받아야 한다.

    //리스트 안에 프레그먼트를 담음
    private val fragmentlist : ArrayList<Fragment> = ArrayList();

    override fun getItemCount(): Int = fragmentlist.size // 한줄로 가능

    override fun createFragment(position: Int): Fragment = fragmentlist[position]

    fun addFragment(fragment: Fragment){
        fragmentlist.add(fragment)

        // viewPager에게 추가된것을 알려줘야함!!
        notifyItemInserted(fragmentlist.size-1)

        // 3개의 fragment

    }


}