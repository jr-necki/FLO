package com.example.flo

import androidx.fragment.app.Fragment
import androidx.viewpager2.adapter.FragmentStateAdapter

class HomeViewpagerAdapter (fragment : Fragment) : FragmentStateAdapter(fragment) {

    private val fragmentlist : ArrayList<Fragment> = ArrayList()

    override fun getItemCount(): Int = fragmentlist.size

    override fun createFragment(position: Int): Fragment = fragmentlist[position]

    fun addFragment(fragment : Fragment){
        fragmentlist.add(fragment)
        notifyItemInserted(fragmentlist.size - 1)// 0 1 2 와 같이 3개의 프래그먼트가 list에 있는데 외부에서
    // 4번째 프래그먼트를 list의 맨 뒤에 add를 했으니 지금 size는 4이고 그럼
    // 0 1 2 3 포지션으로는 3 인덱스에 있겠죠? 이걸 이제 어댑터에게 새롭게 추가된 아이템이 있으니 다시 viewpager에게 알려줘!
    // 라는 것으로 추가된 곳의 인덱스를 인자로 넘겨 notifyItemInserted를 호출
    }
}