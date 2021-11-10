package com.example.flo

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.viewpager2.widget.ViewPager2
import com.example.flo.databinding.FragmentHomeBinding
import com.example.flo.databinding.ItemAlbumBinding
import com.google.android.material.tabs.TabLayoutMediator
import com.google.gson.Gson


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
        //앨범 별 수록곡
        var butter=ArrayList<Song>()
        butter.add(Song("Butter","bts",164,0,false))
        butter.add(Song("IDOL","bts",164,0,false))
        butter.add(Song("Dynamite","bts",164,0,false))
        var lilac=ArrayList<Song>()
        butter.add(Song("Lilac","아이유",164,0,false))
        butter.add(Song("좋은날","아이유",164,0,false))
        var astroworld=ArrayList<Song>()
        butter.add(Song("Sickomode","Travis scott",164,0,false))
        butter.add(Song("Goosebumps","Travis scott",164,0,false))

        // 데이터 리스트 생성 더미 데이터
        albumDatas.apply {
            add(Album("Butter","방탄소년단 (BTS)",R.drawable.img_album_exp,butter))
            add(Album("Lilac","아이유 (IU)",R.drawable.img_album_exp2,lilac))
            add(Album("SICKO MODE","Travis Scott",R.drawable.album_cover_sickmode,astroworld))
            add(Album("Savage","에스파 (AESPA)",R.drawable.album_cover_savage,butter))

        }



        // 더미데이터랑 Adapter 연결
        val albumRVAdapter = AlbumRVAdapter(albumDatas)

        // 리사이클러뷰에 어댑터를 연결
        binding.homeTodaySongRecycle.adapter = albumRVAdapter

        albumRVAdapter.setMyItemClickListener(object : AlbumRVAdapter.MyItemClickListener{

            override fun onItemClick(album : Album){
                changeAlbumFragment(album)
            }

            override fun onRemoveAlbum(position: Int) {
              albumRVAdapter.removeItem(position)
            }

            override fun onPlayBtnClick(binding: ItemAlbumBinding) {
                
            }
        })
        // 레이아웃 매니저 설정
        binding.homeTodaySongRecycle.layoutManager = LinearLayoutManager(context, LinearLayoutManager.HORIZONTAL,false)



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


    private fun changeAlbumFragment(album: Album) {
        (context as MainActivity).supportFragmentManager.beginTransaction()
            // mainActivity의 frame --> 바꿀 프레그먼트
            .replace(R.id.main_frm, AlbumFragment().apply {
                arguments = Bundle().apply {
                    val gson = Gson()
                    val albumJson = gson.toJson(album)
                    putString("album", albumJson)
                }
            })
            .commitAllowingStateLoss()
    }


}